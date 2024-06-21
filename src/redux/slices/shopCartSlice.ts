import { createSlice } from "@reduxjs/toolkit";
import {
  addProductShopCart,
  deleteAllProductShopCart,
  deleteProductShopCart,
} from "../actions/shopCart.action";
import { COMMON } from "../../constants/common";
import { RootState } from "../store";
import { TypeParamsPostShopCart } from "../../pages/DetailProduct/component/InforDetailProduct";
// export interface ShopCart {
//   id: number;
//   userId?: number;
//   productSizeId?: number;
//   quantity?: number;
//   created_at?: string;
//   updated_at?: string;
// }
export interface ShopCartState {
  listCartItem: TypeParamsPostShopCart[];
}

const initialState: ShopCartState = {
  listCartItem: [],
};

const shopCartSlice = createSlice({
  name: "shopCart",
  initialState,
  reducers: {
    setCartItems: (state) => {
      const cartItems = localStorage.getItem(COMMON.CART_ITEMS);
      if (cartItems) {
        state.listCartItem = JSON.parse(cartItems);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProductShopCart.fulfilled, (state, action) => {
      const productIndex = state.listCartItem.findIndex(
        (item) =>
          item.userId === action.payload.userId &&
          item.productSizeId === action.payload.productSizeId
      );
      if (productIndex !== -1) {
        state.listCartItem[productIndex].quantity! += action.payload.quantity!;
      } else {
        state.listCartItem.push(action.payload);
      }
    });
    builder.addCase(deleteProductShopCart.fulfilled, (state, action) => {
      state.listCartItem = state.listCartItem.filter(
        (item) => item.productSizeId !== action.payload.productSizeId
      );
      if (state.listCartItem.length === 0) {
        localStorage.removeItem(COMMON.CART_ITEMS);
      }
    });
    builder.addCase(deleteAllProductShopCart.fulfilled, (state) => {
      state.listCartItem = [];
      localStorage.removeItem("priceTypeShip");
      localStorage.removeItem("priceDiscount");
      localStorage.removeItem("selectedVoucher");
      localStorage.removeItem(COMMON.CART_ITEMS);
    });
  },
});

export const shopCartSelector = (state: RootState) => state.shopCart;

export const { setCartItems } = shopCartSlice.actions;

export default shopCartSlice.reducer;
