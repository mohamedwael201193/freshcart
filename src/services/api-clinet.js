import axios from "axios";
import { API_CONFIG } from "../config";

export const apiclinet = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 30000,
});
apiclinet.interceptors.response.use(
  (response) => {
    return Promise.resolve({
      success: true,
      data: response.data,
    });
  },
  (error) => {
    return Promise.reject({
      success: false,
      error: error,
      message: error.response.data.message,
    });
  }
);

apiclinet.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (token) {
    config.headers.token = token;
  }

  return config;
});
