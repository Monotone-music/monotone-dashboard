import { LoginData } from "@/interface/Login";
import apiClient from "./apiClient";

export const signIn = async (data: LoginData) => {
    return (await apiClient.post('/auth/login?flag=admin', data));
}

export const refreshTokenApi2 = async () => {
    
    const response = await apiClient.post('/auth/refresh?flag=admin', {
      refreshToken: localStorage.getItem('refreshToken')
    });
    return response.data.data;
  };

