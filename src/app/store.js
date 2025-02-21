import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { PaymentApi } from '../service/Leads';

export const store = configureStore({
  reducer: {
    [PaymentApi.reducerPath]: PaymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(PaymentApi.middleware),
});

setupListeners(store.dispatch);