import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    userDetails: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      const D = JSON.parse(localStorage.getItem("profile"));
      state.user = {
        name: user ? user.name : D.name,
        role: user ? user.role : D.role,
      };

      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.userDetails = null;
    },
    setDetails: (state, action) => {
      const { user } = action.payload;
      state.userDetails = user;
    },
  },
});

export const { setCredentials, logOut, setDetails } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) =>
  state.auth.user || JSON.parse(localStorage.getItem("profile"));
export const selectCurrentToken = (state) =>
  state.auth.token || JSON.parse(localStorage.getItem("profile"))?.accessToken;
export const selectCurrentUserDetails = (state) => state.auth.userDetails;
