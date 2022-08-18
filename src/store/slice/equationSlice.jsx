import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const equationSlice = createSlice({
  name: "equationAction",
  initialState,
  reducers: {
    updateEquationInfo: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { updateEquationInfo } = equationSlice.actions;

export default equationSlice.reducer;
