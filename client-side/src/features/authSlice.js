import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/apiAuth";

const initialState = {
  businessName: null,
  email: null,
  token: null,
  expiredAt: null,
  status: "idle",
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    // Panggil API login (contoh pakai axios)
    const res = await api.post("auth/login", { email, password });
    return {
      businessName: res.data.businessName,
      email: res.data.email,
      token: res.data.access_token,
      expiredAt: Date.now() + 10 * 60 * 1000, // 5 menit
    };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.businessName = null;
      state.email = null;
      state.token = null;
      state.expiredAt = null;
      sessionStorage.removeItem("auth");
    },
    restoreAuth: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const { businessName, email, token, expiredAt } = action.payload;
      state.businessName = businessName;
      state.email = email;
      state.token = token;
      state.expiredAt = expiredAt;
      state.status = "authenticated";

      sessionStorage.setItem("auth", JSON.stringify(state));
    });
  },
});

export const { logout, restoreAuth } = authSlice.actions;
export default authSlice.reducer;
