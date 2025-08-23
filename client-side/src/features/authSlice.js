import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/apiAuth";

const initialState = {
  user: null,
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
      user: res.data.email,
      token: res.data.access_token,
      expiredAt: Date.now() + 5 * 60 * 1000, // 5 menit
    };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
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
      const { user, token, expiredAt } = action.payload;
      state.user = user;
      state.token = token;
      state.expiredAt = expiredAt;
      state.status = "authenticated";

      sessionStorage.setItem("auth", JSON.stringify(state));
    });
  },
});

export const { logout, restoreAuth } = authSlice.actions;
export default authSlice.reducer;
