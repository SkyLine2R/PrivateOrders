import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "./slice.js";
console.log(inputReducer);
export default configureStore({
  reducer: { input: inputReducer },
});
