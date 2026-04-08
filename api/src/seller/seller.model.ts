import mongoose, { Schema, type Document } from 'mongoose';

export interface ISeller extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  businessName: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SellerSchema = new Schema<ISeller>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: true },
    businessName: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const SellerModel = mongoose.model<ISeller>('Seller', SellerSchema);
