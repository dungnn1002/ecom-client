import { AxiosResponse } from "axios";
import { QueryParamType, defaultQueryParam } from "../constants/type";
import { API } from "./axios";
import { TypeShip } from "../pages/Admin/components/TypeShip/ListTypeShip";
export const getAllTypeShip = async ({
  page,
  limit,
}: QueryParamType = defaultQueryParam): Promise<AxiosResponse<any>> => {
  const data = await API.get("typeship/all", {
    params: {
      page,
      limit,
    },
  });
  return data.data;
};
export const addTypeShip = async (
  data: TypeShip
): Promise<AxiosResponse<any>> => {
  return await API.post("typeship/add-typeship", data);
};
