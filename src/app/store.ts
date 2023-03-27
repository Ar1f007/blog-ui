import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from './rootReducer';

import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { commentsApi } from './slices/comments';
import { postInfoApi } from './slices/posts/postInfoApi';
import { logout } from './slices/users/slice';
import { dashboardInfoApi } from './slices/users/user-dashboard-info-api';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['theme', 'category', 'tag', 'post'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      toast.error(
        action?.payload?.data?.message ||
          action?.payload?.message ||
          action?.error?.message ||
          'Something went wrong',
        {
          toastId: 'ServerError',
        },
      );
    }

    switch (action?.payload?.status) {
      case 401 || 403:
        api.dispatch(logout());
        break;

      default:
        next(action);
    }

    return next(action);
  };

export const store = configureStore({
  reducer: persistedReducer,

  devTools: process.env.NODE_ENV !== 'production',

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      commentsApi.middleware,
      postInfoApi.middleware,
      dashboardInfoApi.middleware,
      rtkQueryErrorLogger,
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
