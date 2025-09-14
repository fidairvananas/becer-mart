// src/store/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/apiAuth"; // bisa dipisah jadi apiProduct kalau mau

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { getState }) => {
    const token = getState().auth.token; // ambil token dari auth slice
    const res = await api.get("products", {
      headers: {
        access_token: token,
      },
    });
    return res.data;
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, { getState }) => {
    const token = getState().auth.token;
    const res = await api.post("products", productData, {
      headers: {
        access_token: token,
      },
    });
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }, { getState }) => {
    const token = getState().auth.token;
    const res = await api.put(`products/${id}`, productData, {
      headers: {
        access_token: token,
      },
    });
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { getState }) => {
    const token = getState().auth.token;
    await api.delete(`products/${id}`, {
      headers: {
        access_token: token,
      },
    });
    return id;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Create
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });

    // Update
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    });

    // Delete
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    });
  },
});

export default productSlice.reducer;
