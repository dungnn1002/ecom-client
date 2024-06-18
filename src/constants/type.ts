export interface QueryParamType {
  page: number;
  limit: number;
}

export interface UserQueryParamType extends QueryParamType {
  phoneNumber?: string; // thêm phoneNumber như một tùy chọn
}

export interface CategoryQueryParamType extends QueryParamType {
  brandId?: number;
  name?: string;
}

export const defaultQueryParam: QueryParamType = {
  page: 1,
  limit: 2000,
};

export type BrandResponse = {
  id: number;
  name: string;
};

export type CategoryResponse = {
  id: number;
  name: string;
};
export type TypeVoucherResponse = {
  id: number;
  value: number;
  typeVoucher: string;
};

export type TypeCodeVoucherResponse = {
  codeVoucher: string;
  typeVoucherId: number;
  amount: number;
  fromDate: Date;
  toDate: string;
  typeVoucher: TypeVoucherResponse;
};

export type ListType = {
  value: number;
  label: string;
};

export type TypeShipAddressResponse = {
  id: number;
  shipAddress: string;
  shipName: string;
  shipPhone: string;
  shipEmail: string;
};

export type ParamPostShipAddress = {
  userId: number;
  shipAddress: string;
  shipName: string;
  shipPhone: string;
  shipEmail: string;
};
