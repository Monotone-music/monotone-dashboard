import { LoginData } from "@/interface/Login";
import apiClient from "./apiClient";

export const signIn = async (data: LoginData) => {
    return (await apiClient.post('/auth/login', data));
}

export const refreshTokenApi2 = async () => {
    
    const response = await apiClient.post('/auth/refresh', {
      refreshToken: localStorage.getItem('refreshToken')
    });
    console.log();
    return response.data.data;
  };

