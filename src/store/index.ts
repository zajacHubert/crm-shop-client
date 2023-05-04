import {
  configureStore,
  createSerializableStateInvariantMiddleware,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from './apis/productApi';
import popupSlice from './slices/popupSlice';
import snackbarSlice from './slices/snackbarSlice';
import orderSlice from './slices/orderSlice';
import { usersApi } from './apis/userApi';

const nonSerializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable: (value) => typeof value !== 'function',
});

export const store = configureStore({
  reducer: {
    popup: popupSlice,
    snackbar: snackbarSlice,
    order: orderSlice,
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(nonSerializableMiddleware)
      .concat(productsApi.middleware)
      .concat(usersApi.middleware);
  },
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
