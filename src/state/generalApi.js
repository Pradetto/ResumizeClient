import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const generalApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  reducerPath: "generalApi",
  tagTypes: ["ContactInfo"],
  endpoints: (build) => ({
    contactInfo: build.query({
      query: () => ({
        url: `/general/profileinfo`,
        method: "GET",
      }),
      providesTags: ["ContactInfo"],
      //   invalidatesTags: ["AuthStatus"],
    }),
    uploadFile: build.mutation({
      query: () => ({
        url: `general/upload`,
        method: "POST",
      }),
    }),
  }),
});

export const { useContactInfoQuery, useUploadFileMutation } = generalApi;
