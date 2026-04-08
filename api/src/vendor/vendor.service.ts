import { VendorModel, type IVendor } from './vendor.model';
import type { CreateVendorInput, UpdateVendorInput } from './vendor.router';
import { hash } from 'bcryptjs';

export class VendorService {
  async getAll(): Promise<IVendor[]> {
    return VendorModel.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<IVendor | null> {
    return VendorModel.findById(id);
  }

  async create(data: CreateVendorInput): Promise<IVendor> {
    const password = await hash(data.password, 10);
    return VendorModel.create({ ...data, password });
  }

  async update(id: string, data: UpdateVendorInput): Promise<IVendor | null> {
    const payload: UpdateVendorInput = { ...data };
    if (data.password) {
      payload.password = await hash(data.password, 10);
    }
    return VendorModel.findByIdAndUpdate(id, payload, { new: true });
  }

  async deleteById(id: string): Promise<IVendor | null> {
    return VendorModel.findByIdAndDelete(id);
  }
}
