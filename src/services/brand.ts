import { AxiosResponse } from "axios";
import { QueryParamType, defaultQueryParam } from "../constants/type";
import { BrandType } from "../pages/Admin/components/Brand/ListBrand";
import { API } from "./axios";
import { BrandResponse } from "../constants/type";
export const getAllBrand = async ({
  page,
  limit,
}: QueryParamType = defaultQueryParam): Promise<
  AxiosResponse<BrandResponse[]>
> => {
  const data = await API.get("brand/all", {
    params: {
      page,
      limit,
    },
  });
  return data.data;
};
export const addBrand = async (
  data: BrandType
): Promise<AxiosResponse<any>> => {
  return await API.post("brand/add-brand", data);
};

export const deleteBrand = async (id: number) => {
  return (await API.delete(`brand/delete-brand/${id}`)).data.data;
};
