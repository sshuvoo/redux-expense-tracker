import { configureStore } from '@reduxjs/toolkit';
import transactionSlice from './features/transaction/transactionSlice';

const store = configureStore({
   reducer: {
      transaction: transactionSlice,
   },
});

export default store;
