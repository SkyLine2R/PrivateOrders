import { createSlice } from "@reduxjs/toolkit";

export const inputSlice = createSlice({
  name: "inputField",
  initialState: {
    vendorCode: "",
    itemName: "87",
    unit: "м / хл.",
    quantity: "1",
    notes: "",
  },
  reducers: {
    textСorrectionInField: (state = initialState, target) => {
      console.log(target);
      console.log("state");
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
