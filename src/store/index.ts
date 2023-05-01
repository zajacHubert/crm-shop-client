import {
  configureStore,
  createSerializableStateInvariantMiddleware,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from './apis/productApi';
import popupSlice from './slices/popupSlice';

const nonSerializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable: (value) => typeof value !== 'function',
});

export const store = configureStore({
  reducer: {
    popup: popupSlice,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(nonSerializableMiddleware)
      .concat(productsApi.middleware);
  },
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
