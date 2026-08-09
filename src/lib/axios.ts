import axios from "axios";
import { toast } from "sonner";

const baseURL = import.meta.env.VITE_BACKEND_URL;
const mainAppURL = import.meta.env.VITE_MAIN_APP_URL || "http://localhost:3000";

export const CustAxios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

CustAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (
        !error.response ||
        error.code === "ECONNABORTED" ||
        error.message === "Network Error"
      ) {
        toast.error("Network connection unstable. Please check your internet.");
        return Promise.reject(error);
      }

      if (error.response?.status === 503 || error.response?.status === 504) {
        toast.error("Server is taking too long to respond. Please try again.");
        return Promise.reject(error);
      }

      // 401 Unauthorized: The session is missing or invalid.
      if (error.response?.status === 401) {
        // Instantly redirect them to the main app to log in
        window.location.href = `${mainAppURL}/?redirect=maps`;
      }
    }

    return Promise.reject(error);
  },
);
