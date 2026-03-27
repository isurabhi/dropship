import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

const AddressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
});

const CreateSellerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  businessName: z.string().min(1),
  address: AddressSchema,
  isActive: z.boolean().default(true),
});

const UpdateSellerSchema = CreateSellerSchema.partial();

export type CreateSellerInput = z.infer<typeof CreateSellerSchema>;
export type UpdateSellerInput = z.infer<typeof UpdateSellerSchema>;

export const sellerRouter = router({
  getAll: publicProcedure.query(({ ctx }) => ctx.sellerService.getAll()),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => ctx.sellerService.getById(input.id)),

  create: publicProcedure
    .input(CreateSellerSchema)
    .mutation(({ ctx, input }) => ctx.sellerService.create(input)),

  update: publicProcedure
    .input(z.object({ id: z.string(), data: UpdateSellerSchema }))
    .mutation(({ ctx, input }) => ctx.sellerService.update(input.id, input.data)),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => ctx.sellerService.deleteById(input.id)),
});
