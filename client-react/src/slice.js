/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const inputSlice = createSlice({
  name: "inputField",
  initialState: {
    vendorCode: "",
    itemName: "",
    unit: "м / хл.",
    quantity: "1",
    notes: "",
  },
  reducers: {
    textСorrectionInField: (state, target) => {
      state[target.payload.fieldId] = target.payload.value;
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
