import './App.css';
import Profile from './component/profile/Profile';
import 'antd/dist/antd.css'; // o

import { WagmiConfig, createClient, defaultChains, configureChains, chain } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: process.env.ALCHEMY_APIKEY }),
  publicProvider(),
]) 
//set up client
const client = createClient({
  autoConnect: true, 
  logger: {
   warn: (message) => console.log(message)
  },
  // MetaMask là ví điện tử nổi tiếng nhất để kết nối với nền tảng etherum. MetamMask được tích hợp như mà một tiện ích mở rộng.
  // Coinbase Wallet là dịch vụ lưu trữ tiền mã hóa của nền tảng Coinbase.
  
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains, 
      options: {
        appName: 'wagmi'
      }
    }) 
  ],
  provider, 
  webSocketProvider,
})

function App() {
  return (
    <div className="App">
       <WagmiConfig client={client}>
          <Profile />
       </WagmiConfig>
    </div>
  );
}

export default App;
