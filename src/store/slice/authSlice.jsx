import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "authAction",
  initialState,
  reducers: {
    updateAuthInfo: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { updateAuthInfo } = authSlice.actions;

export default authSlice.reducer;
