import { AxiosResponse } from "axios";
import {
  UserQueryParamType,
  defaultQueryParam,
  ParamPostShipAddress,
} from "../constants/type";
import { User } from "../redux/slices/authSlice";
import { UserState } from "../pages/Admin/components/User/AddUser";
import { EditUserType } from "../pages/Admin/components/User/ManageUser";
import { API } from "./axios";
export const getAllUser = async ({
  page,
  limit,
  phoneNumber,
}: UserQueryParamType = defaultQueryParam): Promise<AxiosResponse<User[]>> => {
  const data = await API.get("users/all", {
    params: {
      page,
      limit,
      phoneNumber,
    },
  });
  return data.data;
};

export const addUser = async (data: UserState) => {
  return await API.post("users/add-user", data);
};

export const getShopCart = async () => {
  return (await API.get("users/shopcart")).data.data;
};

export const getShipAddress = async () => {
  return (await API.get("users/ship-address")).data;
};
export const deleteUser = async (id: number) => {
  return (await API.delete(`users/delete-user/${id}`)).data.data;
};

export const editUser = async (id: number, data: EditUserType) => {
  return (await API.post(`users/edit-user/${id}`, data)).data.data;
};

export const addShipAddress = async (data: ParamPostShipAddress) => {
  return (await API.post("address/add", data)).data;
};
export const editShipAddress = async (data: ParamPostShipAddress) => {
  return (await API.post("address/edit", data)).data;
};

export const deleteShipAddress = async (id: number) => {
  return (await API.delete(`address/delete/${id}`)).data;
};
export const editProfile = async (data: FormData) => {
  return (await API.post("users/edit-profile", data)).data;
};

export const addOrder = async (data: any) => {
  return (await API.post("users/add-order", data)).data;
};
