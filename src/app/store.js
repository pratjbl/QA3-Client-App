import { configureStore } from "@reduxjs/toolkit";
import commonState from "../feature/commonState";
import customComponent from "../feature/customComponent";

export default configureStore({
  reducer: {
    counter: commonState,
    customComponent: customComponent,
  },
});
