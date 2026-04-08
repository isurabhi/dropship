import mongoose, { Schema, type Document } from 'mongoose';

export interface IAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ICustomer extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  shippingAddress: IAddress;
  billingAddress: IAddress;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const CustomerSchema = new Schema<ICustomer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: true },
    shippingAddress: { type: AddressSchema, required: true },
    billingAddress: { type: AddressSchema, required: true },
  },
  { timestamps: true },
);

export const CustomerModel = mongoose.model<ICustomer>('Customer', CustomerSchema);
