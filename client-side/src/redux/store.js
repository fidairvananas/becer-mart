import { configureStore } from "@reduxjs/toolkit";
import authReducer, { restoreAuth, logout } from "../features/authSlice";
import productReducer from "../features/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});

// Restore dari sessionStorage
const savedAuth = sessionStorage.getItem("auth");
if (savedAuth) {
  const parsed = JSON.parse(savedAuth);
  if (parsed.expiredAt > Date.now()) {
    store.dispatch(restoreAuth(parsed));
  } else {
    store.dispatch(logout());
  }
}

// Auto cek expired tiap 1 menit
setInterval(() => {
  const state = store.getState().auth;
  if (state.expiredAt && state.expiredAt < Date.now()) {
    store.dispatch(logout());
  }
}, 60 * 1000);

export default store;
