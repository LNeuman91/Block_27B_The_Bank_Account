import React from "react";
import { Provider } from "react-redux";
import store from "./store.js"; // Correct relative path to `store.js`

import Transactions from "../features/transactions/Transactions"; // Import Transactions component
import TransactionHistory from "../features/transactions/TransactionHistory"; // Import TransactionHistory component

import "./app.css"; // Import styles
// TODO: Import the Redux store and provide it to this component using <Provider>.
export default function App() {
  return (
    <Provider store={store}>
      <main>
        <h1>Bank Account</h1>
        <Transactions />
        <TransactionHistory />
      </main>
    </Provider>
  );
}
