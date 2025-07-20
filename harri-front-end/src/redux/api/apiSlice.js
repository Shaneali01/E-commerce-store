import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
console.log('API Base URL:', process.env.NEXT_PUBLIC_BASE_URL);

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = getState()?.auth?.accessToken;
      if (token) {
          headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
  },
  }),
  tagTypes: ["Category", "Products", "Discount", "Coupon", "Product","RelatedProducts"],
  endpoints: (builder) => ({}),
});
