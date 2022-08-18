import { configureStore } from "@reduxjs/toolkit";
import {
  authSlice,
  overviewSlice,
  treeInfoSlice,
  selectSlice,
  equationSlice,
} from "./slice";

export const store = configureStore({
  reducer: {
    allTreeInfo: treeInfoSlice,
    overviewInfo: overviewSlice,
    auth: authSlice,
    selectTree: selectSlice,
    eqValue: equationSlice,
  },
  // middleware: (getDefaultMiddleware) => {
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: ["equationAction/updateEquationInfo"],
  //     },
  //   });
  // },
});
