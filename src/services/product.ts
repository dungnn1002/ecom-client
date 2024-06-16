import { AxiosResponse } from "axios";
import { QueryParamType, defaultQueryParam } from "../constants/type";
import { API } from "./axios";
export const getAllProduct = async ({
  page,
  limit,
}: QueryParamType = defaultQueryParam): Promise<AxiosResponse<any>> => {
  const data = await API.get("product/all-product", {
    params: {
      page,
      limit,
    },
  });
  return data.data;
};
export const addProduct = async (
  data: FormData
): Promise<AxiosResponse<any>> => {
  return await API.post("product/add-product", data);
};

export const getProductById = async (
  id: number
): Promise<AxiosResponse<any>> => {
  const data = await API.get(`product/${id}`);
  return data.data.data;
};

export const editProduct = async (id: number, data: FormData) => {
  return (await API.post(`product/edit-product/${id}`, data)).data.data;
};

export const deleteProduct = async (id: number) => {
  return (await API.delete(`product/delete-product/${id}`)).data.data;
};
