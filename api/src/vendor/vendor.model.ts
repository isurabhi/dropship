import mongoose, { Schema, type Document } from 'mongoose';

export interface IVendorAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface IVendor extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: IVendorAddress;
  serviceAreas: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const VendorAddressSchema = new Schema<IVendorAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const VendorSchema = new Schema<IVendor>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: true },
    address: { type: VendorAddressSchema, required: true },
    serviceAreas: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const VendorModel = mongoose.model<IVendor>('Vendor', VendorSchema);
