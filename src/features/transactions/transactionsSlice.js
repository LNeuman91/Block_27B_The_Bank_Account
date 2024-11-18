import { createSlice } from "@reduxjs/toolkit";

/**
 * Each transaction is recorded as an object with the following properties.
 * @typedef Transaction
 * @property {"deposit"|"withdrawal"|"transfer/[name]"} type
 * @property {number} amount
 * @property {number} balance - The balance after the transaction is completed.
 */

/** Initial state with balance and empty transaction history */
const initialState = {
  balance: 0,
  history: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    // Reducer for deposit
    deposit: (state, { payload }) => {
      state.balance += payload.amount; // Increase balance
      state.history.push({
        type: "deposit",
        amount: payload.amount,
        balance: state.balance,
      });
    },

    // Reducer for withdrawal
    withdrawal: (state, { payload }) => {
      state.balance -= payload.amount; // Decrease balance
      state.history.push({
        type: "withdrawal",
        amount: payload.amount,
        balance: state.balance,
      });
    },

    // Reducer for transfer
    transfer: (state, { payload }) => {
      state.balance -= payload.amount; // Decrease balance
      state.history.push({
        type: `transfer/${payload.recipient}`, // Include recipient in type
        amount: payload.amount,
        balance: state.balance,
      });
    },
  },
});

/** Export actions */
export const { deposit, withdrawal, transfer } = transactionsSlice.actions;

/** Selectors to access state */
export const selectBalance = (state) => state.transactions.balance; // Selector for balance
export const selectHistory = (state) => state.transactions.history; // Selector for transaction history

/** Export the reducer */
export default transactionsSlice.reducer;
