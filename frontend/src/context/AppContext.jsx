import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import { CHAIN_ID, CHAIN_ID_0x } from 'utils/constants';
import { blockExplorerUrl } from '../utils/constants';

export const AppContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [provider, setProvider] = useState();
  const [userAddress, setUserAddress] = useState();
  const [signer, setSigner] = useState();

  async function connectOnLoad() {
    const acc = window.localStorage.getItem('accounts');
    if (acc) {
      connect();
    }
  }

  async function connect() {
    //set up an elemnt in local storage that we use to hold the connected account
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const newProvider = new ethers.providers.Web3Provider(
      window.ethereum,
      'any',
    );

    newProvider.on('network', (_, old) => {
      if (old) {
        window.location.reload();
      }
    });

    const network = await newProvider.getNetwork();
    console.log('accounts');
    window.localStorage.setItem(
      'accounts',
      JSON.stringify(await newProvider.listAccounts()),
    );

    // todo this will need to be updated to handle prod
    if (network.chainId !== CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: CHAIN_ID_0x,
              chainName: 'Aurora Testnet',
              nativeCurrency: {
                name: 'ethereum',
                symbol: 'aETH',
                decimals: 18,
              },
              rpcUrls: ['https://testnet.aurora.dev/'],
              blockExplorerUrls: [blockExplorerUrl],
            },
          ],
        });
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: CHAIN_ID_0x }],
        });
      } catch (e) {
        alert(e.message);
      }
    }

    const signer = newProvider.getSigner();
    setUserAddress(await signer.getAddress());
    setProvider(newProvider);
    setSigner(signer);
  }

  async function disconnect() {
    // Prompt user for account connections
    window.localStorage.setItem('accounts', undefined);
    window.location.reload();
  }

  const value = {
    provider,
    signer,
    connect,
    connectOnLoad,
    disconnect,
    userAddress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
