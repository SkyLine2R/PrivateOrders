import { createSlice } from "@reduxjs/toolkit";

export const inputSlice = createSlice({
  name: "input",
  initialState: {
    vendorCode: 0,
  },
  reducers: {
    textСorrectionInField: (state) => {
      state.vendorCode += 5;
    },
    liveFilter: (state) => {
      state.vendorCode -= 3;
    },
  },
});

export const { textСorrectionInField, liveFilter } = inputSlice.actions;

export default inputSlice.reducer;
//console.log(inputSlice.reducer);
