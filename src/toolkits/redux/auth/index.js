import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userToken: null,
    userInfo: {},
  },
  reducers: {
    signIn: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        ...payload,
      };
    },
    updateUser: (state) => {
      const { userInfo } = state;
      return {
        ...state,
        userInfo: {
          ...userInfo,
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          email: userInfo.email,
        },
      };
    },
    signOut: (state, action) => {
      return {
        isAuthenticated: false,
        userToken: null,
        userInfo: {},
      };
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
