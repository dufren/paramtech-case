// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FormValuesType, PackagesResponseType } from "../../types/types";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://62f9ee323c4f110faa8ed350.mockapi.io/",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData: FormValuesType) => ({
        url: "/api/signup",
        method: "POST",
        body: {
          ...userData,
        },
      }),
    }),
    getPackages: builder.query<PackagesResponseType, undefined>({
      query: () => "/api/packages",
    }),
  }),
});

export const { useLoginMutation, useGetPackagesQuery } = apiSlice;
