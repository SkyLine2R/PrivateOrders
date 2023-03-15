import { createSlice } from "@reduxjs/toolkit";

export const inputSlice = createSlice({
  name: "input",
  initialState: {
    vendorCode: "",
  },
  reducers: {
    textСorrectionInField: (state, target) => {
      console.log(target.payload);
      console.log(state);

      return { ...state, vendorCode: target.payload };
    },
    liveFilter: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.vendorCode -= 3;
    },
  },
});

export const { textСorrectionInField, liveFilter } = inputSlice.actions;

export default inputSlice.reducer;
// console.log(inputSlice.reducer);
