import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
   deleteTransactionAPI,
   getTransactionsAPI,
   postTransactionAPI,
   putTransactionAPI,
} from './transactionAPI';

const initialState = {
   transactions: [],
   isLoading: false,
   isError: false,
   error: '',
   editTransaction: {},
   isEditMode: false,
};

export const getTransactionsAsync = createAsyncThunk(
   'transaction/getTransactions',
   async () => {
      const transactions = await getTransactionsAPI();
      return transactions;
   }
);

export const postTransactionAsync = createAsyncThunk(
   'transaction/postTransaction',
   async (data) => {
      const transaction = await postTransactionAPI(data);
      return transaction;
   }
);

export const putTransactionAsync = createAsyncThunk(
   'transaction/putTransaction',
   async (data) => {
      const transaction = await putTransactionAPI(data);
      return transaction;
   }
);

export const deleteTransactionAsync = createAsyncThunk(
   'transaction/deleteTransaction',
   async (data) => {
      const transaction = await deleteTransactionAPI(data);
      return transaction;
   }
);

const transactionSlice = createSlice({
   name: 'transaction',
   initialState,
   reducers: {
      updateTransaction: (state, { payload }) => {
         state.editTransaction = payload;
         state.isEditMode = true;
      },
      resetUpdateTransaction: (state) => {
         state.editTransaction = {};
         state.isEditMode = false;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getTransactionsAsync.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
         })
         .addCase(getTransactionsAsync.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.error = '';
            state.transactions = payload;
         })
         .addCase(getTransactionsAsync.rejected, (state, { error }) => {
            state.isLoading = false;
            state.isError = true;
            state.error = error.message;
         })
         .addCase(postTransactionAsync.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
         })
         .addCase(postTransactionAsync.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.error = '';
            state.transactions.push(payload);
         })
         .addCase(postTransactionAsync.rejected, (state, { error }) => {
            state.isLoading = false;
            state.isError = true;
            state.error = error.message;
         })
         .addCase(putTransactionAsync.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
         })
         .addCase(putTransactionAsync.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.error = '';
            state.transactions = state.transactions.map((transaction) => {
               if (transaction.id === payload.id) return payload;
               else return transaction;
            });
         })
         .addCase(putTransactionAsync.rejected, (state, { error }) => {
            state.isLoading = false;
            state.isError = true;
            state.error = error.message;
         })
         .addCase(deleteTransactionAsync.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
         })
         .addCase(deleteTransactionAsync.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.error = '';
            state.transactions = state.transactions.filter(
               (transaction) => transaction.id !== payload.id
            );
         })
         .addCase(deleteTransactionAsync.rejected, (state, { error }) => {
            state.isLoading = false;
            state.isError = true;
            state.error = error.message;
         });
   },
});

export default transactionSlice.reducer;
export const { updateTransaction, resetUpdateTransaction } =
   transactionSlice.actions;
