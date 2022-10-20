import React, { useState, useRef, useCallback } from "react";
import styles from "./SendTransaction.module.css";
import { useDebounce } from 'use-debounce';
import { usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from 'wagmi';
import { utils } from 'ethers';

export const SendTransaction = () => {
  const [to, setTo] = useState("");
  const [debounceTo] = useDebounce(to, 500);

  const [amount, setAmount] = useState("");
  const [debounceAmount] = useDebounce(amount, 500);

  const { config } = usePrepareSendTransaction({
    request: {
      to: debounceTo, 
      value: debounceAmount ? utils.parseEther(debounceAmount) : undefined
    }
  })

  const { data, sendTransaction } = useSendTransaction(config)
  const { isLoading, isSuccess} = useWaitForTransaction({
    hash: data?.hash
  })

  const handleSubmitForm = (e) => {
    e.preventDefault();  
    sendTransaction?.();
  }
  return (
    <div className={styles.sendTransactionWrapper}>
      <h2>Send Transaction Example</h2>
      <form className={styles.sendTransactionForm} onSubmit={handleSubmitForm}>
        <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Enter your Recipient"></input>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount of token"></input>
        <button disabled={isLoading || !sendTransaction || !to || !amount}>Send</button>
        {isSuccess && (
          <div>
            Successfully sent {amount} ether to {to}
            <div>
              <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
