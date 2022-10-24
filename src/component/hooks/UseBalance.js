import { Spin } from "antd";
import React from "react";
import { useAccount, useBalance } from "wagmi";
import styles from "./Hooks.module.css";

const UseBalance = () => {
  const { address, isConnected } = useAccount();
  // trà vể số dư tài khoản hiện tại
  const { data, isError, isLoading } = useBalance({
    addressOrName: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
    token: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
  });

  const renderBalance = () => {
    if (isError) return <div>Error fetching balance</div>
    return (
      <div>
        {isLoading ? <Spin /> : (
          <div>
            Balance: {data?.formatted} {data?.symbol}
            <br />
            Address: {address}
          </div>
        )}
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
