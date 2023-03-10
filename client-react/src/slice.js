import { createSlice } from "@reduxjs/toolkit";

export const inputSlice = createSlice({
  name: "input",
  initialState: {
    vendorCode: "",
  },
  reducers: {
    text–°orrectionInField: (state, target) => {
      console.log(target.payload);
      console.log(state);

      return { ...state, vendorCode: target.payload };
    },
    liveFilter: (state) => {
      state.vendorCode -= 3;
    },
  },
});

export const { text–°orrectionInField, liveFilter } = inputSlice.actions;

export default inputSlice.reducer;
// console.log(inputSlice.reducer);
