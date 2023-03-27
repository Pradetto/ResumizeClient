import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const generalApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  reducerPath: "generalApi",
  tagTypes: ["ContactInfo", "ResumeList", "UploadFile"],
  endpoints: (build) => ({
    contactInfo: build.query({
      query: () => ({
        url: `/general/profileinfo`,
        method: "GET",
      }),
      providesTags: ["ContactInfo"],
      //   invalidatesTags: ["AuthStatus"],
    }),
    getResumeList: build.query({
      query: () => ({
        url: `/general/resumes`,
        method: "GET",
      }),
      providesTags: ["ResumeList"],
      invalidatesTags: ["UploadFile"],
    }),
    uploadFile: build.mutation({
      query: (file) => ({
        url: `/general/upload`,
        method: "POST",
        body: file,
      }),
      providesTags: ["UploadFile"],
      invalidatesTags: ["ResumeList"],
    }),
  }),
});

export const {
  useContactInfoQuery,
  useUploadFileMutation,
  useGetResumeListQuery,
} = generalApi;
