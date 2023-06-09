import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  FormValuesType,
  PackagesResponseType,
  PaymentDataType,
  PaymentResponseType,
} from "../../types/types";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
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
    getPaymentContent: builder.query<PaymentResponseType, undefined>({
      query: () => "/api/payment",
    }),
    SendPayment: builder.mutation({
      query: (paymentData: PaymentDataType) => ({
        url: "/api/payment",
        method: "POST",
        body: {
          ...paymentData,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetPackagesQuery,
  useGetPaymentContentQuery,
  useSendPaymentMutation,
} = apiSlice;
