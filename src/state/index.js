import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { formApi } from "./formApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [formApi.reducerPath]: formApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(authApi.middleware, formApi.middleware),
});
setupListeners(store.dispatch);

export default store;
