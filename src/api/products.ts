import { apiClient } from './apiClient';
import { Product } from '@/types';

export const productApi = {
    getProducts: async (params?: any) => {
        const response = await apiClient.get<Product[]>('products/', { params });
        return response.data;
    },

    getProduct: async (slug: string) => {
        const response = await apiClient.get<Product>(`products/${slug}/`);
        return response.data;
    },

    getCategories: async () => {
        const response = await apiClient.get('products/categories/');
        return response.data;
    },

    createProduct: async (data: FormData) => {
        const response = await apiClient.post<Product>('products/', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    updateProduct: async (id: string, data: FormData) => {
        const response = await apiClient.patch<Product>(`products/${id}/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    deleteProduct: async (id: string) => {
        const response = await apiClient.delete(`products/${id}/`);
        return response.data;
    },
};
