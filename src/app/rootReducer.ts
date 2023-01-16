import { combineReducers } from '@reduxjs/toolkit';

import themeReducer from './slices/themeSlice';

const reducer = combineReducers({
  theme: themeReducer,
});

export default reducer;
