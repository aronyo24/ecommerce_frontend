import { apiClient } from "@/api/apiClient";
import {
    AuthResponse,
    LoginPayload,
    RegisterPayload,
    VerifyOtpPayload,
    ForgotPasswordPayload,
    ResetPasswordPayload,
    User
} from "@/types";

export const authApi = {
    register: async (payload: RegisterPayload) => {
        const response = await apiClient.post<{ message: string }>('register/', payload);
        return response.data;
    },

    verifyOtp: async (payload: VerifyOtpPayload) => {
        const response = await apiClient.post<{ message: string }>('verify-otp/', payload);
        return response.data;
    },

    login: async (payload: LoginPayload) => {
        const response = await apiClient.post<AuthResponse>('login/', payload);
        return response.data;
    },

    forgotPassword: async (payload: ForgotPasswordPayload) => {
        const response = await apiClient.post<{ message: string }>('forgot-password/', payload);
        return response.data;
    },

    resetPassword: async (payload: ResetPasswordPayload) => {
        const response = await apiClient.post<{ message: string }>('reset-password/', payload);
        return response.data;
    },

    resendOtp: async (email: string) => {
        const response = await apiClient.post<{ message: string }>('resend-otp/', { email });
        return response.data;
    },

    getProfile: async () => {
        const response = await apiClient.get<User>('profile/');
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    }
};