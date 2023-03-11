import { combineReducers } from '@reduxjs/toolkit';

import categoryReducer from './slices/categories/slice';
import { commentsApi } from './slices/comments';
import postReducer from './slices/posts/slice';
import tagReducer from './slices/tags/slice';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/users/slice';

const reducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  post: postReducer,
  category: categoryReducer,
  tag: tagReducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
});

export default reducer;
