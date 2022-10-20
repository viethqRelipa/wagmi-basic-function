import { verifyMessage } from "ethers/lib/utils";
import React from "react";
import { useSignMessage } from "wagmi";
import styles from "./SignMessage.module.css";

export function SignMessage() {
  const recoveredAddress = React.useRef("");
  const { data, error, isLoading, signMessage } = useSignMessage()

  const handleSignMessage = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const message = formData.get('message')
    signMessage({ message })
  }

  return (
    <div className={styles.signMessageWrapper}>
      <form onSubmit={(event) => handleSignMessage(event)} className={styles.formSignMessage}>
        <label htmlFor="message" className={styles.title}>Enter your message</label>
        <textarea
          className={styles.textarea}
          id="message"
          name="message"
          placeholder="Enter your message"
        />
        <button disabled={isLoading} className={styles.buttonSubmit}>
          {isLoading ? "Check Wallet" : "Sign Message"}
        </button>

        {data && (
          <div className={styles.textError}>
            <div>Recovered Address: {recoveredAddress.current}</div>
            <div>Signature: {data}</div>
          </div>
        )}

        {error && <div className={styles.textError}>{error.message}</div>}
      </form>
    </div>
  );
}
