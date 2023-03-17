import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User", "AuthStatus"],
    }),
    isAuthenticated: build.query({
      query: () => ({
        url: "/auth/authstatus",
      }),
      providesTags: ["AuthStatus"],
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url: `/auth/resetpassword`,
        method: "POST",
        body: data,
      }),
    }),
    updatePassword: build.mutation({
      query: (data) => ({
        url: `/auth/updatepassword`,
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: build.mutation({
      query: (data) => ({
        url: `/auth/forgotpassword`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useIsAuthenticatedQuery,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
} = authApi;
