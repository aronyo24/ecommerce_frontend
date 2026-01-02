export interface User {
  id: string;
  username: string;
  email: string;
  name?: string; // Compability field
  first_name?: string;
  last_name?: string;
  role: 'user' | 'admin';
  createdAt?: string;
  profile?: {
    phone_number: string | null;
    profile_picture: string | null;
    address: string | null;
    role: string;
    is_email_verified: boolean;
  };
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp_code: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp_code: string;
  new_password: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentProvider: 'stripe' | 'bkash';
  paymentStatus: 'pending' | 'success' | 'failed';
  transactionId?: string;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface PaymentIntent {
  clientSecret: string;
  paymentIntentId: string;
}

export interface EditProductPayload {
  name?: string;
  sku?: string;
  description?: string;
  price?: number;
  stock?: number;
  status?: 'active' | 'inactive';
  image?: string;
}

export interface BkashPayment {
  paymentId: string;
  redirectUrl: string;
}
