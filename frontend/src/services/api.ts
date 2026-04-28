//path: frontend/src/services/api.ts
import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    withCredentials: true,
})
export default API;

// import.meta.env.VITE_API_URL ||