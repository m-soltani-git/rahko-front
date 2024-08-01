import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const settingSlice = createSlice({
  name: "setting",
  initialState: {
    theme: {
      color: 'mui',
      mode: 'light'
    },
    language: {
      language: "fa",
      direction: "rtl",
    },
  },
  reducers: {
    setTheme: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        theme: payload,
      };
    },
    setLanguage: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        language: payload,
      };
    },
  },
});

export const { setTheme, setLanguage } = settingSlice.actions;

export default settingSlice.reducer;
