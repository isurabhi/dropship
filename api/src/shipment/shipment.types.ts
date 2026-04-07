export type ShipmentStatus =
  | 'pending'
  | 'assigned'
  | 'picked_up'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'failed'
  | 'returned';

export interface ITrackingEvent {
  status: ShipmentStatus;
  description: string;
  location: string;
  timestamp: Date;
  updatedBy: string;
}
