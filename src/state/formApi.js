import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const formApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  reducerPath: "formApi",
  tagTypes: [
    "Resume",
    "Company",
    "ContactInfo",
    "ResumeList",
    "UploadFile",
    "CompaniesList",
    "PostCompany",
    "CreateRole",
    "UniqueRole",
    "ExistingLink",
  ],
  endpoints: (build) => ({
    contactInfo: build.query({
      query: () => ({
        url: `/form/profileinfo`,
        method: "GET",
      }),
      providesTags: ["ContactInfo"],
    }),

    /* RESUME */
    getResumeList: build.query({
      query: () => ({
        url: `/form/resumes`,
        method: "GET",
      }),
      providesTags: ["ResumeList"],
      invalidatesTags: ["UploadFile"],
    }),
    uploadFile: build.mutation({
      query: (file) => ({
        url: `/form/upload`,
        method: "POST",
        body: file,
      }),
      providesTags: ["UploadFile"],
      invalidatesTags: ["ResumeList"],
    }),

    /* COMPANY */
    getCompaniesList: build.query({
      query: () => ({
        url: `/form/companies`,
        method: "GET",
      }),
      providesTags: ["CompaniesList"],
      // invalidatesTags: ["UploadFile"],
    }),
    insertCompany: build.mutation({
      query: (data) => ({
        url: `/form/postcompany`,
        method: "POST",
        body: data,
      }),
      providesTags: ["PostCompany"],
      invalidatesTags: ["CompaniesList"],
    }),

    /* JOBS */
    getUnqiueRoles: build.query({
      query: (company_id) => ({
        url: `/form/roles/${company_id}`,
        method: "GET",
      }),
      providesTags: ["UniqueRoles"],
      invalidatesTags: [],
    }),
    getExistingLink: build.query({
      query: (link) => ({
        url: `/form/link/${link}`,
        method: "GET",
      }),
      providesTags: ["ExistingLink"],
      invalidatesTags: [],
    }),
    deleteDrafts: build.mutation({
      query: () => ({
        url: `/form/deletedrafts`,
        method: "GET",
      }),
    }),
    createRole: build.mutation({
      query: (data) => ({
        url: `/form/createrole`,
        method: "POST",
        body: data,
      }),
      providesTags: ["CreateRole"],
      invalidatesTags: ["UniqueRoles", "ExistingLink"],
    }),

    /* SUBMIT */
    uploadForm: build.mutation({
      query: (data) => ({
        url: `/form/submit`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useContactInfoQuery,
  /* RESUME */
  useUploadFileMutation,
  useGetResumeListQuery,

  /* COMPANY */
  useGetCompaniesListQuery,
  useInsertCompanyMutation,

  /* JOBS */
  useGetUnqiueRolesQuery,
  useGetExistingLinkQuery,
  useCreateRoleMutation,
  useDeleteDraftsMutation,

  /* SUBMIT */
  useUploadFormMutation,
} = formApi;
