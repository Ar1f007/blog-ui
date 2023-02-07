import { combineReducers } from '@reduxjs/toolkit';

import categoryReducer from './slices/categories/slice';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/users/slice';

const reducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  category: categoryReducer,
});

export default reducer;
