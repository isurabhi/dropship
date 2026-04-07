import mongoose, { Schema, type Document } from 'mongoose';
import type { ShipmentStatus, ITrackingEvent } from './shipment.types';

export interface IShipment extends Document {
  sellerId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  vendorId?: mongoose.Types.ObjectId;
  trackingNumber: string;
  packageDetails: {
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    description: string;
    value: number;
  };
  pickupAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  status: ShipmentStatus;
  trackingHistory: ITrackingEvent[];
  estimatedDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const TrackingEventSchema = new Schema<ITrackingEvent>({
  status: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  updatedBy: { type: String, required: true },
});

const ShipmentSchema = new Schema<IShipment>(
  {
    sellerId: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor' },
    trackingNumber: { type: String, required: true, unique: true },
    packageDetails: {
      weight: { type: Number, required: true },
      dimensions: {
        length: { type: Number, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
      },
      description: { type: String, required: true },
      value: { type: Number, required: true },
    },
    pickupAddress: { type: AddressSchema, required: true },
    deliveryAddress: { type: AddressSchema, required: true },
    status: {
      type: String,
      enum: ['pending', 'assigned', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'failed', 'returned'],
      default: 'pending',
    },
    trackingHistory: [TrackingEventSchema],
    estimatedDelivery: { type: Date },
  },
  { timestamps: true },
);

export const ShipmentModel = mongoose.model<IShipment>('Shipment', ShipmentSchema);
