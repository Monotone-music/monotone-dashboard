
import { useMutation } from "@tanstack/react-query";
// import { signIn } from "../service/auth.api";
import { AxiosResponse } from "axios";
import { signIn } from "../authService";
import { useAuthStore } from "@/store/useAuthStore";
import { ISignInForm } from "@/interface/AuthState";

export const useSignInMutation = () => {
    const { setIsAuthenticated, setRefreshToken,setToken, setError } = useAuthStore();
  
    return useMutation({
    mutationFn: (data: ISignInForm) => signIn(data),
      onSuccess: (data:AxiosResponse) => {
        setIsAuthenticated(true);
        setToken(data.data.data.accessToken);
        setRefreshToken(data.data.data.refreshToken)
        // console.log(data.data)
        localStorage.setItem('token', data.data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.data.refreshToken);
      },
      onError: (error: any) => {
        // Set error state in Zustand on failed login
        setError(error?.response?.data?.message || 'Login failed');
        console.error('Login failed', error);
      },
    });
  };
