/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const inputSlice = createSlice({
  name: "inputField",
  initialState: {
    vendorCode: "",
    itemName: "",
    unit: "0",
    quantity: "1",
    notes: "",
  },
  reducers: {
    changeValue: (state, target) => {
      state[target.payload.fieldId] = target.payload.value;
    },
    textСorrectionInField: (state, target) => {
      state[target.payload.fieldId] = target.payload.value;
    },
    liveFilter: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.vendorCode -= 3;
    },
  },
});

export const { textСorrectionInField, liveFilter, changeValue } =
  inputSlice.actions;

export default inputSlice.reducer;
// console.log(inputSlice.reducer);
