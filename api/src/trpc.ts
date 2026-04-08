import { initTRPC } from '@trpc/server';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { CustomerService } from './customer/customer.service';
import { VendorService } from './vendor/vendor.service';
import { SellerService } from './seller/seller.service';
import { ShipmentService } from './shipment/shipment.service';
import { AuthService } from './auth/auth.service';

export const createContext = (_opts: CreateExpressContextOptions) => {
  return {
    customerService: new CustomerService(),
    vendorService: new VendorService(),
    sellerService: new SellerService(),
    shipmentService: new ShipmentService(),
    authService: new AuthService(),
  };
};

export type Context = ReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
