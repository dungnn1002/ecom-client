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

export const getAllCommentByProduct = async (
  id: number,
  { page, limit }: QueryParamType = defaultQueryParam
): Promise<AxiosResponse<any>> => {
  const data = await API.get(`comment/product/${id}`, {
    params: {
      page,
      limit,
    },
  });
  return data.data;
};
export const getAllProductByFilter = async ({
  page,
  limit,
  brandId,
  categoryId,
  name,
  sort,
  order,
}: QueryParamType & {
  brandId: number;
  categoryId: number;
  name: string;
  sort: "discountPrice" | "name" | "createdAt";
  order: "asc" | "desc";
}): Promise<AxiosResponse<any>> => {
  const data = await API.get("product/all-product-filter", {
    params: {
      page,
      limit,
      brandId,
      categoryId,
      name,
      sort,
      order,
    },
  });
  return data.data;
};

export const addComment = async (
  data: FormData
): Promise<AxiosResponse<any>> => {
  return await API.post("comment/add", data);
};

export const getAllComment = async ({
  page,
  limit,
}: QueryParamType = defaultQueryParam): Promise<AxiosResponse<any>> => {
  const data = await API.get("comment/all", {
    params: {
      page,
      limit,
    },
  });
  return data.data;
};

export const getTopProduct = async (): Promise<AxiosResponse<any>> => {
  const data = await API.get("product/top-product");
  return data.data;
};
