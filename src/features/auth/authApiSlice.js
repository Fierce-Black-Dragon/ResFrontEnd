import { apiSlice } from "./../../app/api/apiScile";
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/signin",
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: { ...credentials },
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useProfileQuery } =
  authApiSlice;
