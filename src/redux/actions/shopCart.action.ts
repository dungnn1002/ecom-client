import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addShopCart,
  deleteShopCart,
  updateShopCart,
} from "../../services/shopCart";
import { addOrder } from "../../services/user";
import { TypeParamsPostShopCart } from "../../pages/DetailProduct/component/InforDetailProduct";
export const addProductShopCart = createAsyncThunk(
  "shopCart/addProduct",
  async (data: TypeParamsPostShopCart, { rejectWithValue }) => {
    try {
      const response = await addShopCart(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProductShopCart = createAsyncThunk(
  "shopCart/deleteProduct",
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await deleteShopCart(productId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProductShopCart = createAsyncThunk(
  "shopCart/updateProduct",
  async (data: { id: number; quantity: number }, { rejectWithValue }) => {
    try {
      const response = await updateShopCart(data.id, data.quantity);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteAllProductShopCart = createAsyncThunk(
  "shopCart/deleteAllProduct",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await addOrder(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
