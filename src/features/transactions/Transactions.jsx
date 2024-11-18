import { useState } from "react"; // React hooks for state management
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for dispatching actions and accessing state
import { deposit, withdrawal, transfer, selectBalance } from "./transactionsSlice"; // Actions and selector from transactionsSlice

import "./transactions.scss"; // Importing styles for this component

/**
 * Component for handling user transactions (deposit, withdrawal, transfer).
 */
export default function Transactions() {
  // Access the current balance from the Redux store
  const balance = useSelector(selectBalance);

  // Create a dispatch function to send actions to the Redux store
  const dispatch = useDispatch();

  // Local state for transaction input values
  const [amountStr, setAmountStr] = useState("0.00"); // Amount input as a string
  const [recipient, setRecipient] = useState(""); // Recipient name for transfers

  /**
   * Handles form submission for transactions.
   * Dispatches the appropriate action based on the button clicked.
   */
  const onTransaction = (e) => {
    e.preventDefault(); // Prevent default form submission
    const action = e.nativeEvent.submitter.name; // Determine which button was clicked
    const amount = parseFloat(amountStr); // Convert amount from string to a number

    // Dispatch the appropriate action based on the action type
    if (action === "deposit") {
      dispatch(deposit({ amount }));
    } else if (action === "withdrawal") {
      dispatch(withdrawal({ amount }));
    } else if (action === "transfer") {
      dispatch(transfer({ amount, recipient }));
    }
  };

  return (
    <section className="transactions container">
      <h2>Transactions</h2>
      <figure>
        <figcaption>Current Balance</figcaption>
        <strong>${balance.toFixed(2)}</strong>
      </figure>

      {/* Form for transaction inputs */}
      <form onSubmit={onTransaction}>
        {/* Amount input */}
        <div className="form-row">
          <label>
            Amount
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)} // Update state when user types
            />
          </label>
          {/* Deposit and Withdraw buttons */}
          <div>
            <button name="deposit">Deposit</button>
            <button name="withdrawal">Withdrawal</button>
          </div>
        </div>

        {/* Transfer input */}
        <div className="form-row">
          <label>
            Transfer to
            <input
              placeholder="Recipient Name"
              name="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)} // Update state for recipient
            />
          </label>
          {/* Transfer button */}
          <button name="transfer">Transfer</button>
        </div>
      </form>
    </section>
  );
}
