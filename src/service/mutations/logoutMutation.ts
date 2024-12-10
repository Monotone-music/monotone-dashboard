import {useAuthStore} from "@/store/useAuthStore";

export const useLogout = () => {
    const { logout } = useAuthStore();
    return logout;
  };