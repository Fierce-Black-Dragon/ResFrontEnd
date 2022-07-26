import { apiSlice } from "./../../app/api/apiScile";
export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    add: builder.mutation({
      query: (credentials) => ({
        url: "/review/create",
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: { ...credentials },
      }),
    }),
    editByID: builder.mutation({
      query: (credentials, id) => ({
        url: `/review/${id}`,
        method: "PATCH",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: { ...credentials },
      }),
    }),
    deleteReviewByID: builder.mutation({
      query: (id) => ({
        url: `/review/${id}`,
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }),
    }),
    fetchReviews: builder.query({
      query: () => "/review",
    }),
    getByID: builder.query({
      query: (id) => `/review/${id}`,
    }),
  }),
});

export const {
  useAddMutation,
  useDeleteReviewByIDMutation,
  useEditByIDMutation,
  useFetchReviewsQuery,
  useGetByIDQuery,
} = reviewApiSlice;
