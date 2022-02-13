import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import { CHAIN_ID, CHAIN_ID_0x } from 'utils/constants';

export const AppContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [provider, setProvider] = useState();
  const [userAddress, setUserAddress] = useState();
  const [signer, setSigner] = useState();

  async function connect() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const newProvider = new ethers.providers.Web3Provider(
      window.ethereum,
      'any',
    );
    const signer = newProvider.getSigner();

    newProvider.on('network', async (newNetwork) => {
      // trigger network change if not on Near network
      if (newNetwork.chainId !== CHAIN_ID) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: CHAIN_ID_0x }],
        });
        window.location.reload();
      }
    });

    setUserAddress(await signer.getAddress());
    setProvider(newProvider);
    setSigner(signer);
  }

  async function disconnect() {
    // Prompt user for account connections
    const signer = await provider.getSigner();
    console.log('Account:', await signer.getAddress());
    console.log(await signer.getBalance());
    console.log(await provider.getNetwork());
  }

  const value = {
    provider,
    signer,
    connect,
    disconnect,
    userAddress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
