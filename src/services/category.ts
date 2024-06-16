import { AxiosResponse } from "axios";
import { CategoryQueryParamType, defaultQueryParam } from "../constants/type";
import { API } from "./axios";
import { CategoryResponse } from "../constants/type";
import { CategoryType } from "../pages/Admin/components/Category/AddCategory";
import { EditCategoryType } from "../pages/Admin/components/Category/ListCategory";
export const getAllCategory = async ({
  page,
  limit,
  brandId,
  name,
}: CategoryQueryParamType = defaultQueryParam): Promise<
  AxiosResponse<CategoryResponse[]>
> => {
  const data = await API.get("category/all", {
    params: {
      page,
      limit,
      brandId,
      name,
    },
  });
  return data.data;
};
export const addCategory = async (
  data: CategoryType
): Promise<AxiosResponse<any>> => {
  return await API.post("category/add-category", data);
};

export const deleteCategory = async (id: number) => {
  return (await API.delete(`category/delete-category/${id}`)).data.data;
};

export const editCategory = async (id: number, data: EditCategoryType) => {
  return (await API.post(`category/edit-category/${id}`, data)).data.data;
};
