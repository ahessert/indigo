import React from 'react';
import useMetamask from '../hooks/useMetamask';
import { Button } from '@mui/material';

function WalletButton() {
  const { connect, disconnect, provider } = useMetamask();

  return (
    <>
      {provider ? (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={disconnect}
        >
          Connected to
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={connect}
        >
          Connect Wallet
        </Button>
      )}
    </>
  );
}

export default WalletButton;
