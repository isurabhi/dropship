import { CustomerModel, type ICustomer } from './customer.model';
import type { CreateCustomerInput, UpdateCustomerInput } from './customer.router';
import { hash } from 'bcryptjs';

export class CustomerService {
  async getAll(): Promise<ICustomer[]> {
    return CustomerModel.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<ICustomer | null> {
    return CustomerModel.findById(id);
  }

  async create(data: CreateCustomerInput): Promise<ICustomer> {
    const password = await hash(data.password, 10);
    return CustomerModel.create({ ...data, password });
  }

  async update(id: string, data: UpdateCustomerInput): Promise<ICustomer | null> {
    const payload: UpdateCustomerInput = { ...data };
    if (data.password) {
      payload.password = await hash(data.password, 10);
    }
    return CustomerModel.findByIdAndUpdate(id, payload, { new: true });
  }

  async deleteById(id: string): Promise<ICustomer | null> {
    return CustomerModel.findByIdAndDelete(id);
  }
}
