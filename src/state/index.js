import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(authApi.middleware),
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
