import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.4.79:8000/api", // ganti sesuai backend-mu
  withCredentials: true, // jika pakai Sanctum untuk login
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
