import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const selectSlice = createSlice({
  name: "selectAction",
  initialState,
  reducers: {
    updateSelectInfo: (state, action) => action.payload,
  },
});

export const { updateSelectInfo } = selectSlice.actions;

export default selectSlice.reducer;
