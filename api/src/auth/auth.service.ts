import { compare } from 'bcryptjs';
import { TRPCError } from '@trpc/server';
import jwt from 'jsonwebtoken';
import { CustomerModel, type IAddress } from '../customer/customer.model';
import { SellerModel } from '../seller/seller.model';
import { VendorModel } from '../vendor/vendor.model';

export type AuthRole = 'seller' | 'shipment_vendor' | 'customer';

interface AuthUserBase {
  id: string;
  email: string;
  role: AuthRole;
}

interface AuthCustomerUser extends AuthUserBase {
  role: 'customer';
  shippingAddress: IAddress;
  billingAddress: IAddress;
}

interface AuthBusinessUser extends AuthUserBase {
  role: 'seller' | 'shipment_vendor';
}

export type AuthUser = AuthCustomerUser | AuthBusinessUser;

export interface LoginResponse {
  token: string;
  role: AuthRole;
  user: AuthUser;
}

export class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    const normalizedEmail = email.toLowerCase().trim();

    const [seller, vendor, customer] = await Promise.all([
      SellerModel.findOne({ email: normalizedEmail }).select('+password'),
      VendorModel.findOne({ email: normalizedEmail }).select('+password'),
      CustomerModel.findOne({ email: normalizedEmail }).select('+password'),
    ]);

    const matches = [
      seller
        ? ({
            role: 'seller' as const,
            id: seller._id.toString(),
            email: seller.email,
            password: seller.password,
          } as const)
        : null,
      vendor
        ? ({
            role: 'shipment_vendor' as const,
            id: vendor._id.toString(),
            email: vendor.email,
            password: vendor.password,
          } as const)
        : null,
      customer
        ? ({
            role: 'customer' as const,
            id: customer._id.toString(),
            email: customer.email,
            password: customer.password,
            shippingAddress: customer.shippingAddress,
            billingAddress: customer.billingAddress,
          } as const)
        : null,
    ].filter((entry): entry is NonNullable<typeof entry> => entry !== null);

    if (matches.length === 0) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid email or password',
      });
    }

    if (matches.length > 1) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Email is associated with multiple roles. Use unique emails per role.',
      });
    }

    const matchedUser = matches[0];
    const isPasswordValid = await compare(password, matchedUser.password);

    if (!isPasswordValid) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid email or password',
      });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'JWT secret is not configured',
      });
    }

    const expiresIn = (process.env.JWT_EXPIRES_IN ?? '1d') as jwt.SignOptions['expiresIn'];

    const token = jwt.sign(
      {
        sub: matchedUser.id,
        email: matchedUser.email,
        role: matchedUser.role,
      },
      secret,
      { expiresIn },
    );

    const user: AuthUser =
      matchedUser.role === 'customer'
        ? {
            id: matchedUser.id,
            email: matchedUser.email,
            role: matchedUser.role,
            shippingAddress: matchedUser.shippingAddress,
            billingAddress: matchedUser.billingAddress,
          }
        : {
            id: matchedUser.id,
            email: matchedUser.email,
            role: matchedUser.role,
          };

    return {
      token,
      role: matchedUser.role,
      user,
    };
  }
}
