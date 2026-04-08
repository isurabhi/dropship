import { router } from './trpc';
import { customerRouter } from './customer/customer.router';
import { vendorRouter } from './vendor/vendor.router';
import { sellerRouter } from './seller/seller.router';
import { shipmentRouter } from './shipment/shipment.router';
import { authRouter } from './auth/auth.router';

export const appRouter = router({
  customer: customerRouter,
  vendor: vendorRouter,
  seller: sellerRouter,
  shipment: shipmentRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
