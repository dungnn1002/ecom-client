import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginUser } from "../../services/auth";
import { LoginState } from "../../pages/Authenticate/Login";
import { COMMON } from "../../constants";
import { getUser } from "../../services/auth";
export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginState, { rejectWithValue }) => {
    try {
      const response = await LoginUser(data);
      localStorage.setItem(COMMON.ACCESS_TOKEN, response.data.accessToken);
      localStorage.setItem(COMMON.REFRESH_TOKEN, response.data.refreshToken);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUser();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);  
