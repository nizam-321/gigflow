//path: frontend/src/services/authApi.ts
import API from "./api";

interface LoginData {
    email: string;
    password: string;
}

export const loginUser = async (data: LoginData) => {
    const response = await API.post("/auth/login", data);
    return response.data;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
}

export const signupUser = async (data: SignupData) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await API.post("/auth/logout");
  return response.data;
};

export const getMe = async () => {
  const response = await API.get("/auth/me");
  return response.data;
};
