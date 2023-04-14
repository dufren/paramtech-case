// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://62f9ee323c4f110faa8ed350.mockapi.io/",
  }),
  endpoints: (builder) => ({}),
});

export const {} = apiSlice;
