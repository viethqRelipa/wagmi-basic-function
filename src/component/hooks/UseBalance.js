import { Spin } from "antd";
import React from "react";
import { useAccount, useBalance } from "wagmi";
import styles from "./Hooks.module.css";

const UseBalance = () => {
  const { address, isConnected } = useAccount();
  // trà vể số dư tài khoản hiện tại
  const { data: balance, isLoading } = useBalance({
    addressOrName: address,
    onSuccess(data) {
      console.log("success:", data)
    },
    onError(error) {
      console.log("error:",error)
    },
    onSettled(data, error) {
      console.log("settled:", data, error)
    }
  })

  console.log("balance:", balance, isLoading)

  const renderBalance = () => {
    return (
      <div>
        {/* {isLoading ? <Spin /> : ( */}
          {/* <div>
            Balance: {data?.formatted} {data?.symbol}
            <br />
            Address: {address}
          </div> */}
        {/* )} */}
        hello
      </div>
    )
  }

  return (
    <div>
      {isConnected ? (
        <div>
          {renderBalance()}
        </div>
      ) : (
        <div>Please connect to connectors</div>
      )}
    </div>
  );
};

export default UseBalance;
