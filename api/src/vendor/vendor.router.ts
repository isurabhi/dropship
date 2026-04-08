import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

const VendorAddressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
});

const CreateVendorSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().min(1),
  address: VendorAddressSchema,
  serviceAreas: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
});

const UpdateVendorSchema = CreateVendorSchema.partial();

export type CreateVendorInput = z.infer<typeof CreateVendorSchema>;
export type UpdateVendorInput = z.infer<typeof UpdateVendorSchema>;

export const vendorRouter = router({
  getAll: publicProcedure.query(({ ctx }) => ctx.vendorService.getAll()),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => ctx.vendorService.getById(input.id)),

  create: publicProcedure
    .input(CreateVendorSchema)
    .mutation(({ ctx, input }) => ctx.vendorService.create(input)),

  update: publicProcedure
    .input(z.object({ id: z.string(), data: UpdateVendorSchema }))
    .mutation(({ ctx, input }) => ctx.vendorService.update(input.id, input.data)),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => ctx.vendorService.deleteById(input.id)),
});
