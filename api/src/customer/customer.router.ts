import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

const AddressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
});

const CreateCustomerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  shippingAddress: AddressSchema,
  billingAddress: AddressSchema,
});

const UpdateCustomerSchema = CreateCustomerSchema.partial();

export type CreateCustomerInput = z.infer<typeof CreateCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof UpdateCustomerSchema>;

export const customerRouter = router({
  getAll: publicProcedure.query(({ ctx }) => ctx.customerService.getAll()),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => ctx.customerService.getById(input.id)),

  create: publicProcedure
    .input(CreateCustomerSchema)
    .mutation(({ ctx, input }) => ctx.customerService.create(input)),

  update: publicProcedure
    .input(z.object({ id: z.string(), data: UpdateCustomerSchema }))
    .mutation(({ ctx, input }) => ctx.customerService.update(input.id, input.data)),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => ctx.customerService.deleteById(input.id)),
});
