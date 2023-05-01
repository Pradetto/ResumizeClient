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
    "CreateJob",
    "RolesAndHiringManagers",
    "CreateRole",
    "CreateHiringManager",
    "AllFiles",
  ],
  endpoints: (build) => ({
    contactInfo: build.query({
      query: () => ({
        url: `/form/profileinfo`,
        method: "GET",
      }),
      providesTags: ["ContactInfo"],
      invalidateTags: [""],
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
    getRolesAndHiringManager: build.query({
      query: (company_id) => ({
        url: `/form/companyinfo/${company_id}`,
        method: "GET",
      }),
      providesTags: ["RolesAndHiringManagers"],
      invalidatesTags: [],
    }),
    getExistingLink: build.mutation({
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
    createJob: build.mutation({
      query: (data) => ({
        url: `/form/createjob`,
        method: "POST",
        body: data,
      }),
      providesTags: ["CreateJob"],
      invalidatesTags: ["RolesAndHiringManagers", "ExistingLink"],
    }),
    createRole: build.mutation({
      query: (data) => ({
        url: `/form/createrole`,
        method: "POST",
        body: data,
      }),
      providesTags: ["CreateRole"],
      invalidatesTags: ["RolesAndHiringManagers"],
    }),

    /* HIRING MANAGER */
    createHiringManager: build.mutation({
      query: (data) => ({
        url: `/form/createhiringmanager`,
        method: "POST",
        body: data,
      }),
      providesTags: ["CreateHiringManager"],
      invalidatesTags: ["RolesAndHiringManagers"],
    }),

    /* SUBMIT */
    uploadForm: build.mutation({
      query: (data) => ({
        url: `/form/submit`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ContactInfo", "AllFiles"],
    }),
    rerollAndEditCoverLetter: build.mutation({
      query: (data) => ({
        url: `/chat/prompt`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ContactInfo", "AllFiles"],
    }),

    /* GENERAL FILE PROCESSING */
    uploadFile: build.mutation({
      query: (file) => ({
        url: `/general/upload`,
        method: "POST",
        body: file,
      }),
      providesTags: ["UploadFile"],
      invalidatesTags: ["ResumeList"],
    }),

    downloadFile: build.mutation({
      query: (fileKey) => ({
        url: `/general/download?file_key=${fileKey}`,
        method: "GET",
      }),
    }),
    downloadDefaultFile: build.mutation({
      query: (fileKey) => ({
        url: `/general/download/default?file_key=${fileKey}`,
        method: "GET",
      }),
    }),
    getAllFiles: build.query({
      query: () => ({
        url: `/general/files`,
        method: "GET",
      }),
      providesTags: ["AllFiles"],
      invalidatesTags: [],
    }),
  }),
});

export const {
  useContactInfoQuery,
  /* RESUME */
  useGetResumeListQuery,

  /* COMPANY */
  useGetCompaniesListQuery,
  useInsertCompanyMutation,

  /* JOBS */
  useGetExistingLinkMutation,
  useCreateJobMutation,
  useDeleteDraftsMutation,

  /* ROLES */
  useCreateRoleMutation,

  /* HIRING MANAGER */
  useCreateHiringManagerMutation,

  /* ROLES AND HIRING MANAGER */
  useGetRolesAndHiringManagerQuery,

  /* SUBMIT */
  useUploadFormMutation,
  useRerollAndEditCoverLetterMutation,

  /* GENERAL FILE PROCESSING */
  useUploadFileMutation,
  useDownloadFileMutation,
  useDownloadDefaultFileMutation,
  useGetAllFilesQuery,
} = formApi;
