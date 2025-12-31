export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
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

export interface BkashPayment {
  paymentId: string;
  redirectUrl: string;
}
