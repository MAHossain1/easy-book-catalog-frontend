// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/restrict-template-expressions */
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
//   tagTypes: ["comments"],
//   endpoints: builder => ({
//     getBooks: builder.query({
//       query: () => "/books",
//     }),
//     updateBook: builder.mutation({
//       query: ({ id, book }) => ({
//         url: `/edit-book/${id}`,
//         method: "PATCH",
//         body: book,
//       }),
//     }),
//     singleBook: builder.query({
//       query: id => `/book/${id}`,
//     }),
//     postComment: builder.mutation({
//       query: ({ id, data }) => ({
//         url: `/comment/${id}`,
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["comments"],
//     }),
//     postBook: builder.mutation({
//       query: book => ({
//         url: "/books",
//         method: "POST",
//         body: book,
//       }),
//     }),
//     deleteBook: builder.mutation({
//       query: id => ({
//         url: `/book/${id}`,
//         method: "DELETE",
//       }),
//     }),
//     getComment: builder.query({
//       query: id => `/comment/${id}`,
//       providesTags: ["comments"],
//     }),
//   }),
// });

// export const {
//   useGetBooksQuery,
//   useSingleBookQuery,
//   usePostBookMutation,
//   usePostCommentMutation,
//   useGetCommentQuery,
//   useDeleteBookMutation,
//   useUpdateBookMutation,
// } = api;
