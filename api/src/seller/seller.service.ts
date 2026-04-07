import { SellerModel, type ISeller } from './seller.model';
import type { CreateSellerInput, UpdateSellerInput } from './seller.router';

export class SellerService {
  async getAll(): Promise<ISeller[]> {
    return SellerModel.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<ISeller | null> {
    return SellerModel.findById(id);
  }

  async create(data: CreateSellerInput): Promise<ISeller> {
    return SellerModel.create(data);
  }

  async update(id: string, data: UpdateSellerInput): Promise<ISeller | null> {
    return SellerModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<ISeller | null> {
    return SellerModel.findByIdAndDelete(id);
  }
}
