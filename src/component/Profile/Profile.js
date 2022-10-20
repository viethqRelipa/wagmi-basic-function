import React from "react";
import {
  useConnect,
  useAccount,
  useEnsAvatar,
  useEnsName,
  useDisconnect,
} from "wagmi";
import { SendTransaction } from "../SendTransaction/SendTransaction";
import { MinNFT } from '../MintNFT/MintNFT'
import { MintNFTForm } from '../MinNFTForm/MintNFTForm'
import styles from './Profile.module.css'
import { SignMessage } from "../SignMessage/SignMessage";

const Profile = () => {
  const { address, connector, isConnected } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  console.log("connecttro:", connectors);

  return (
    <div>
      {isConnected ? (
        <div>
          {/* <SendTransaction /> */}
          {/* <MinNFT /> */}
          {/* <MintNFTForm />  */}
          {/* <img src={ensAvatar} alt="ENS Avatar" /> */}
          {/* <div className={styles.accountInfo}>
            <div><b>Address:</b> {ensName ? `${ensName} (${address})` : address}</div>
            <div>Connected to {connector?.name}</div>
            <button className={styles.buttonDisconnect} onClick={disconnect}>Disconnect</button>
          </div> */}
          <SignMessage />
        </div>
      ) : (
        <div>
          {connectors.map((connector) => (
            <button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
              className={styles.buttonConnect}
            >
              {connector.name}
              {!connector.ready && "(unsupported)"}
              {isLoading && connector.id === pendingConnector?.id && "(connecting)"}
            </button>
          ))}
          {error && <div>{error.message}</div>}
        </div>
      )}
    </div>
  );
};

export default Profile;
