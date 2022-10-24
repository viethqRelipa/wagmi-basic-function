import React from "react";
import Hooks from "../hooks/index"
import ExampleWagmi from '../example/index'
import { Tabs } from 'antd'
import {
  useConnect,
  useAccount,
  useDisconnect,
} from "wagmi";
import styles from "./Profile.module.css";



const Profile = () => {
  // hook useAccount là hook giúp truy cập vào tài khoản acount và kiểm tra tình trạng kết nối
  // hook return value như address, connector, isConnecting, isConnected ....
  // link: https://wagmi.sh/docs/hooks/useAccount
  const { isConnected, address } = useAccount();
  // hook sử dụng để kết nối với tài khoản ví với các nền tảng ví điện tử
  // hook return về các giá trị như connect, connectors...
  // link: https://wagmi.sh/docs/hooks/useConnect
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  // hook sử dụng để ngắt kết nối với tài khoản ví điện tử.
  const { disconnect } = useDisconnect();

  return (
    <div>
      {isConnected ? (
        <div className={styles.tabsWrapper}>
          <div>
            <Tabs defaultActiveKey="11">
              <Tabs.TabPane tab="Hook" key="1">
                <Hooks />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Example Wagmi" key="2">
                <ExampleWagmi />
              </Tabs.TabPane>
            </Tabs>
          </div>

          <button className={styles.buttonDisconnect} onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <div>
          <Connectors connectors={connectors} pendingConnector={pendingConnector} isLoading={isLoading} error={error} connect={connect} />
        </div>
      )}
    </div>
  );
};

export default Profile;

const Connectors = ({ connectors, error, connect, isLoading, pendingConnector }) => {
  return (
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
  );
};
