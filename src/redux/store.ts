import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import shopCartReducer from "./slices/shopCartSlice";
import { useDispatch } from "react-redux";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    shopCart: shopCartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
