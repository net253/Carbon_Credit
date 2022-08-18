import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const overviewSlice = createSlice({
  name: "overviewAction",
  initialState,
  reducers: {
    updateOverviewInfo: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { updateOverviewInfo } = overviewSlice.actions;

export default overviewSlice.reducer;
