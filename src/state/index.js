import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { generalApi } from "./generalApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [generalApi.reducerPath]: generalApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(authApi.middleware, generalApi.middleware),
});
setupListeners(store.dispatch);

export default store;

// import { authApi } from "./authApi";
// import { postsApi } from "./postsApi";

// const store = configureStore({
//   reducer: {
//     [authApi.reducerPath]: authApi.reducer,
//     [postsApi.reducerPath]: postsApi.reducer,
//   },
//   middleware: (getDefault) =>
//     getDefault().concat(authApi.middleware, postsApi.middleware),
// });
