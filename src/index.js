import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { WagmiConfig, createClient, defaultChains, configureChains, chain } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains([chain.mainnet, chain.polygon], [
  alchemyProvider({ apiKey: process.env.ALCHEMY_APIKEY }),
  publicProvider(),
]) 
//set up client
const client = createClient({
  autoConnect: true, 
  logger: {
   warn: (message) => console.log(message)
  },
  connectors: [
    new MetaMaskConnector({ chains }),
    // new CoinbaseWalletConnector({
    //   chains, 
    //   options: {
    //     appName: 'wagmi'
    //   }
    // }) 

  ],
  provider, 
  webSocketProvider,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);

