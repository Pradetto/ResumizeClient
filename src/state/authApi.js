import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { nanoid } from "@reduxjs/toolkit";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  reducerPath: "authAPI",
  tagTypes: ["User", "AuthStatus"],
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (data) => ({
        url: `/auth/register`,
        method: "POST",
        body: data,
      }),
      providesTags: ["User"],
      invalidatesTags: ["AuthStatus"],
    }),
    loginUser: build.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      providesTags: ["User"],
      invalidatesTags: ["AuthStatus"],
    }),
    logoutUser: build.mutation({
      query: (data) => ({
        url: `/auth/logout`,

        method: "POST",
      }),
      invalidatesTags: ["User", "AuthStatus"],
    }),
    isAuthenticated: build.query({
      query: () => ({
        url: "/auth/auth-status",
      }),
      providesTags: ["AuthStatus"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useIsAuthenticatedQuery,
} = authApi;
