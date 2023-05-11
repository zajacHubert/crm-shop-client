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
import userSlice from './slices/userSlice';
import { ordersApi } from './apis/orderApi';
import { rolesApi } from './apis/roleApi';

const nonSerializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable: (value) => typeof value !== 'function',
});

export const store = configureStore({
  reducer: {
    popup: popupSlice,
    snackbar: snackbarSlice,
    order: orderSlice,
    user: userSlice,
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(nonSerializableMiddleware)
      .concat(productsApi.middleware)
      .concat(usersApi.middleware)
      .concat(ordersApi.middleware)
      .concat(rolesApi.middleware);
  },
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
