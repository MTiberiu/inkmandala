import { createSlice } from "@reduxjs/toolkit";
const hslValours = { h: 360, s: 100, l: 50 };
const hslSlice = createSlice({
  name: "hsl",
  initialState: hslValours,
  reducers: {
    hue(state) {
      state.h = state.h + 30;
    },
    saturation(state) {
      state.s = state.s + 2;
    },
    light(state) {
      state.l = state.l + 2;
    },
  },
});
export const hslActions = hslSlice.actions;
export default hslSlice;
