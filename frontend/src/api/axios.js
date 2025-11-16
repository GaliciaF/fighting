import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Laravel API base URL
  withCredentials: true, // needed if using Sanctum cookies
});

export default api;
