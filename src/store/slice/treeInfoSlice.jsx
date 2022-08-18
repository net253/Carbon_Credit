import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const treeInfoSlice = createSlice({
  name: "treeInfoAction",
  initialState,
  reducers: {
    updateTreeInfoInfo: (state, action) => {
      return [...action.payload];
    },
  },
});

export const { updateTreeInfoInfo } = treeInfoSlice.actions;

export default treeInfoSlice.reducer;
