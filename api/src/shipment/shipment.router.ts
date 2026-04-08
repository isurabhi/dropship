import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

const AddressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
});

const PackageDetailsSchema = z.object({
  weight: z.number().positive(),
  dimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
  }),
  description: z.string().min(1),
  value: z.number().nonnegative(),
});

const TrackingEventSchema = z.object({
  status: z.enum([
    'pending',
    'assigned',
    'picked_up',
    'in_transit',
    'out_for_delivery',
    'delivered',
    'failed',
    'returned',
  ]),
  description: z.string().min(1),
  location: z.string().min(1),
  timestamp: z.coerce.date().optional(),
  updatedBy: z.string().min(1),
});

const CreateShipmentSchema = z.object({
  sellerId: z.string().min(1),
  customerId: z.string().min(1),
  vendorId: z.string().min(1).optional(),
  trackingNumber: z.string().min(1),
  packageDetails: PackageDetailsSchema,
  pickupAddress: AddressSchema,
  deliveryAddress: AddressSchema,
  status: z
    .enum([
      'pending',
      'assigned',
      'picked_up',
      'in_transit',
      'out_for_delivery',
      'delivered',
      'failed',
      'returned',
    ])
    .optional(),
  trackingHistory: z.array(TrackingEventSchema).optional(),
  estimatedDelivery: z.coerce.date().optional(),
});

const UpdateShipmentSchema = CreateShipmentSchema.partial();

export type CreateShipmentInput = z.infer<typeof CreateShipmentSchema>;
export type UpdateShipmentInput = z.infer<typeof UpdateShipmentSchema>;

export const shipmentRouter = router({
  getAll: publicProcedure.query(({ ctx }) => ctx.shipmentService.getAll()),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => ctx.shipmentService.getById(input.id)),

  create: publicProcedure
    .input(CreateShipmentSchema)
    .mutation(({ ctx, input }) => ctx.shipmentService.create(input)),

  update: publicProcedure
    .input(z.object({ id: z.string(), data: UpdateShipmentSchema }))
    .mutation(({ ctx, input }) => ctx.shipmentService.update(input.id, input.data)),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => ctx.shipmentService.deleteById(input.id)),
});
