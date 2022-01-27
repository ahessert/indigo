import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import WalletButton from './WalletButton';

function App() {
  // todo check if chain is correct and redirect if not

  return (
    <div className='App'>
      <img src={logo} className='App-logo' alt='logo' />
      <h2>Web3 Functions</h2>
      <WalletButton/>
    </div>
  );
}

export default App;
