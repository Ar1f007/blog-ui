import { createSlice } from '@reduxjs/toolkit';

type ThemeState = {
  darkMode: boolean;
};

const initialState: ThemeState = {
  darkMode: !!JSON.parse(localStorage.getItem('theme') as string),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,

  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
