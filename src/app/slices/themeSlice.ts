import { createSlice } from '@reduxjs/toolkit';

import type { Dispatch } from '@reduxjs/toolkit';

type ThemeState = {
  darkMode: boolean;
};

const initialState: ThemeState = {
  darkMode: !!JSON.parse(localStorage.getItem('darkMode') as string),
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

export const asyncToggleTheme = () => (dispatch: Dispatch) => {
  const isDarkMode = !!JSON.parse(localStorage.getItem('darkMode') as string);

  localStorage.setItem('darkMode', JSON.stringify(!isDarkMode));

  dispatch(toggleTheme());
};

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
