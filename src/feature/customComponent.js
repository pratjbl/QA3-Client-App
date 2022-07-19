import { createSlice } from "@reduxjs/toolkit";

export const customComponents = createSlice({
  name: "customComponents",
  initialState: {
    value: {
      customHeader: null,
      customFooter: null,
      customLeftContainer: null,
    },
  },
  reducers: {
    updateCustomComponents: (state, action) => {
      const { customFooter, customHeader, customLeftContainer } =
        action.payload;
      state.value = {
        customFooter: customFooter,
        customHeader: customHeader,
        customLeftContainer: customLeftContainer,
      };
    },
  },
});

export const { updateCustomComponents } = customComponents.actions;

export default customComponents.reducer;
