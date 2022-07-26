import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://restapinew.herokuapp.com/api",
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user?.accessToken) {
      headers.set("authorization", `Bearer ${user.accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result?.error?.originalStatus === 403 ||
    result?.error?.originalStatus === 401
  ) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      api.dispatch(
        setCredentials({ user, token: refreshResult.data.accessToken })
      );
      // store the new token
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
