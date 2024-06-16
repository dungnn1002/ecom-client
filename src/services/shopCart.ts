import { API } from "./axios";
import { TypeParamsPostShopCart } from "../pages/DetailProduct/component/InforDetailProduct";
export const addShopCart = async (
  data: TypeParamsPostShopCart
): Promise<TypeParamsPostShopCart> => {
  const res = await API.post("shopCart/add-shopcart", data);
  return res.data;
};

export const deleteShopCart = async (id: number) => {
  const res = await API.delete(`shopCart/delete-shopcart/${id}`);
  return res.data.data;
};

export const updateShopCart = async (id: number, quantity: number) => {
  const res = await API.post(`shopCart/update-shopcart/${id}`, { quantity });
  return res.data;
};
