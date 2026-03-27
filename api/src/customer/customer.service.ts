import { CustomerModel, type ICustomer } from './customer.model';
import type { CreateCustomerInput, UpdateCustomerInput } from './customer.router';

export class CustomerService {
  async getAll(): Promise<ICustomer[]> {
    return CustomerModel.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<ICustomer | null> {
    return CustomerModel.findById(id);
  }

  async create(data: CreateCustomerInput): Promise<ICustomer> {
    return CustomerModel.create(data);
  }

  async update(id: string, data: UpdateCustomerInput): Promise<ICustomer | null> {
    return CustomerModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<ICustomer | null> {
    return CustomerModel.findByIdAndDelete(id);
  }
}
