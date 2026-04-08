import { SellerModel, type ISeller } from './seller.model';
import type { CreateSellerInput, UpdateSellerInput } from './seller.router';
import { hash } from 'bcryptjs';

export class SellerService {
  async getAll(): Promise<ISeller[]> {
    return SellerModel.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<ISeller | null> {
    return SellerModel.findById(id);
  }

  async create(data: CreateSellerInput): Promise<ISeller> {
    const password = await hash(data.password, 10);
    return SellerModel.create({ ...data, password });
  }

  async update(id: string, data: UpdateSellerInput): Promise<ISeller | null> {
    const payload: UpdateSellerInput = { ...data };
    if (data.password) {
      payload.password = await hash(data.password, 10);
    }
    return SellerModel.findByIdAndUpdate(id, payload, { new: true });
  }

  async deleteById(id: string): Promise<ISeller | null> {
    return SellerModel.findByIdAndDelete(id);
  }
}
