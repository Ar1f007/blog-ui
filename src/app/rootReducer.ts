import { combineReducers } from '@reduxjs/toolkit';

import categoryReducer from './slices/categories/slice';
import { commentsApi } from './slices/comments';
import { postInfoApi } from './slices/posts/postInfoApi';
import postReducer from './slices/posts/slice';
import tagReducer from './slices/tags/slice';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/users/slice';
import { dashboardInfoApi } from './slices/users/user-dashboard-info-api';
import { usersApi } from './slices/users/users-api';

const reducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  post: postReducer,
  category: categoryReducer,
  tag: tagReducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
  [postInfoApi.reducerPath]: postInfoApi.reducer,
  [dashboardInfoApi.reducerPath]: dashboardInfoApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
});

export default reducer;
