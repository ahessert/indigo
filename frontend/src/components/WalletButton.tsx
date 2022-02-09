import React from 'react';
import useMetamask from '../hooks/useMetamask';
import { Button } from '@mui/material';
import shortenAddress from 'utils/shortenAddress';

function WalletButton() {
  const { connect, disconnect, provider, userAddress } = useMetamask();

  return (
    <>
      {provider ? (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={disconnect}
        >
          Connected to {shortenAddress(userAddress)}
        </Button>
      ) : (
        <Button
          variant="contained"
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
