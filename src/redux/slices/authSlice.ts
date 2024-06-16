import { createSlice } from "@reduxjs/toolkit";
import { login, getMe } from "../actions/auth.action";
import { COMMON } from "../../constants/common";
import { RootState } from "../store";
export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address?: string;
  gender?: string;
  phoneNumber?: string;
  image?: string;
  dob?: string;
  isActiveEmail?: string;
  roleId: string;
  status?: string;
  userToken?: string;
}
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    active(state: AuthState) {
      if (state.user) state.user = { ...state.user, status: COMMON.ACTIVE };
    },
    logout(state: AuthState) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem(COMMON.ACCESS_TOKEN);
      localStorage.removeItem(COMMON.REFRESH_TOKEN);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state: AuthState) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state: AuthState, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state: AuthState) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(getMe.pending, (state: AuthState) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state: AuthState, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state: AuthState) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
  },
});

export const authSelector = (state: RootState) => state.auth;

export const { active, logout } = authSlice.actions;

export default authSlice.reducer;
