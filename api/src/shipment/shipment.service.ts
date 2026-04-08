import { ShipmentModel, type IShipment } from './shipment.model';
import type { CreateShipmentInput, UpdateShipmentInput } from './shipment.router';

export class ShipmentService {
  async getAll(): Promise<IShipment[]> {
    return ShipmentModel.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<IShipment | null> {
    return ShipmentModel.findById(id);
  }

  async create(data: CreateShipmentInput): Promise<IShipment> {
    return ShipmentModel.create(data);
  }

  async update(id: string, data: UpdateShipmentInput): Promise<IShipment | null> {
    return ShipmentModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<IShipment | null> {
    return ShipmentModel.findByIdAndDelete(id);
  }
}
