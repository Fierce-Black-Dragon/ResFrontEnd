import { apiSlice } from "./../../app/api/apiScile";
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (credentials) => ({
        url: "/product/create",
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        },
        body: { ...credentials },
      }),
    }),
    editByID: builder.mutation({
      query: (credentials, id) => ({
        url: `/product/${id}`,
        method: "PATCH",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: { ...credentials },
      }),
    }),
    deleteByID: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }),
    }),
    getProducts: builder.query({
      query: () => "/product",
      keepUnusedDataFor: 5,
    }),
    fetchProductById: builder.query({
      query: (id) => `/product/${id}`,
    }),
  }),
});

export const {
  useCreateMutation,
  useEditByIdMutation,
  useGetProductsQuery,
  useDeleteByIDMutation,
  useFetchProductByIdQuery,
} = productApiSlice;
