import React from 'react';
import useMetamask from '../hooks/useMetamask';
import { Button, Typography } from '@material-ui/core';
import { AccountBalanceWallet } from '@material-ui/icons';

function WalletButton() {
  const { connect, disconnect, provider } = useMetamask();

  return (
    <>
      {provider ? (
        <Button onClick={disconnect}>
          Connected to
          <Typography>12342</Typography>
        </Button>
      ) : (
        <Button onClick={connect}>
          <AccountBalanceWallet />
          Connect
        </Button>
      )}
    </>
  );
}

export default WalletButton;
