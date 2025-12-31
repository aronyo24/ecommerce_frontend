import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
};

// Products API
export const productsApi = {
  getAll: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get('/products', { params }),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (data: ProductInput) => api.post('/products', data),
  update: (id: string, data: Partial<ProductInput>) =>
    api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

// Orders API
export const ordersApi = {
  getAll: () => api.get('/orders'),
  getById: (id: string) => api.get(`/orders/${id}`),
  create: (data: OrderInput) => api.post('/orders', data),
  updateStatus: (id: string, status: string) =>
    api.patch(`/orders/${id}/status`, { status }),
};

// Payments API
export const paymentsApi = {
  createStripeIntent: (orderId: string) =>
    api.post('/payments/stripe/create-intent', { orderId }),
  confirmStripePayment: (paymentIntentId: string) =>
    api.post('/payments/stripe/confirm', { paymentIntentId }),
  initiateBkash: (orderId: string) =>
    api.post('/payments/bkash/initiate', { orderId }),
  confirmBkash: (paymentId: string) =>
    api.post('/payments/bkash/confirm', { paymentId }),
};

// Types
export interface ProductInput {
  name: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  image?: string;
}

export interface OrderInput {
  items: { productId: string; quantity: number }[];
  paymentProvider: 'stripe' | 'bkash';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}
