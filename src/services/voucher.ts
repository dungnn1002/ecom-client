import { AxiosResponse } from "axios";
import { QueryParamType, defaultQueryParam } from "../constants/type";
import { API } from "./axios";
import { TypeVoucher } from "../pages/Admin/components/Voucher/ListTypeVoucher";
import { TypeVoucherResponse } from "../constants/type";
import { TypeCodeVoucherResponse } from "../constants/type";
export const getAllTypeVoucher = async ({
  page,
  limit,
}: QueryParamType = defaultQueryParam): Promise<
  AxiosResponse<TypeVoucherResponse[]>
> => {
  const data = await API.get("voucher/all-typeVoucher", {
    params: {
      page,
      limit,
    },
  });
  return data.data;
};
export const addTypeVoucher = async (
  data: TypeVoucher
): Promise<AxiosResponse<any>> => {
  return await API.post("voucher/add-typeVoucher", data);
};

export const addCodeVoucher = async (
  data: TypeVoucher
): Promise<AxiosResponse<any>> => {
  return await API.post("voucher/add-codeVoucher", data);
};

export const getAllCodeVoucher = async ({
  page,
  limit,
}: QueryParamType = defaultQueryParam): Promise<
  AxiosResponse<TypeCodeVoucherResponse[]>
> => {
  const data = await API.get("voucher/all-voucher", {
    params: {
      page,
      limit,
    },
  });
  return data.data;
};
