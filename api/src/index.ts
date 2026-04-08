import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import dotenv from 'dotenv';
import { connectDB } from './db';
import { appRouter } from './router';
import { createContext } from './trpc';
import { CustomerService } from './customer/customer.service';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' }));
app.use(express.json());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/customers', async (req, res) => {
  try {
    const customerService = new CustomerService();
    const customer = await customerService.create(req.body);
    res.status(201).json({
      id: customer._id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      shippingAddress: customer.shippingAddress,
      billingAddress: customer.billingAddress,
      createdAt: customer.createdAt,
    });
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: unknown }).code === 11000
    ) {
      res.status(409).json({ message: 'Customer with this email already exists.' });
      return;
    }

    res.status(400).json({ message: 'Invalid customer payload.' });
  }
});

const start = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start().catch(console.error);
