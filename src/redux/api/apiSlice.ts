import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: builder => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    postBook: builder.mutation({
      query: book => ({
        url: "/books",
        method: "POST",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        body: book,
      }),
    }),
  }),
});

export const { useGetBooksQuery, usePostBookMutation } = api;
