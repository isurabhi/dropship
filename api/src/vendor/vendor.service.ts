import { VendorModel, type IVendor } from './vendor.model';
import type { CreateVendorInput, UpdateVendorInput } from './vendor.router';

export class VendorService {
  async getAll(): Promise<IVendor[]> {
    return VendorModel.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<IVendor | null> {
    return VendorModel.findById(id);
  }

  async create(data: CreateVendorInput): Promise<IVendor> {
    return VendorModel.create(data);
  }

  async update(id: string, data: UpdateVendorInput): Promise<IVendor | null> {
    return VendorModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<IVendor | null> {
    return VendorModel.findByIdAndDelete(id);
  }
}
