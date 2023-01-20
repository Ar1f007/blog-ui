import { combineReducers } from '@reduxjs/toolkit';

import themeReducer from './slices/themeSlice';
import userReducer from './slices/users/slice';

const reducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
});

export default reducer;
