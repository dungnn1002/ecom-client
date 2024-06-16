import axios from "axios";
import { AxiosResponse } from "axios";
import { LoginState } from "../pages/Authenticate/Login";
import { RegisterState } from "../pages/Authenticate/Register";
import { API } from "./axios";
export const LoginUser = async (
  data: LoginState
): Promise<AxiosResponse<any>> => {
  return await API.post("auth/login", data);
};

export const RegisterUser = async (
  data: RegisterState
): Promise<AxiosResponse<{ data: { message: string } }>> => {
  return await API.post("auth/register", data);
};

export const getUser = async (): Promise<AxiosResponse<any>> => {
  return await API.get("auth/me");
};
