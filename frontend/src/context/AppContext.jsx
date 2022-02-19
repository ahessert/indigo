import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';

export const AppContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [provider, setProvider] = useState();
  const [userAddress, setUserAddress] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    connect();
  }, []);

  async function connect() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const newProvider = new ethers.providers.Web3Provider(
      window.ethereum,
      'any',
    );
    const signer = newProvider.getSigner();

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
