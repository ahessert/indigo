import React, { useContext } from 'react';
import { AppContext } from 'context/AppContext';
import { Button, Typography, useTheme } from '@mui/material';
import shortenAddress from 'utils/shortenAddress';
import MetamaskLogoText from 'svg/illustrations/MetamaskLogoText';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function WalletButton() {
  const { connect, disconnect, provider, userAddress } = useContext<any>(AppContext);
  const theme = useTheme();

  return (
    <>
      {provider ? (
        <Button
          variant="contained"
          size="large"
          onClick={disconnect}
          disabled
          sx={{
            '&:disabled': {
              backgroundColor: theme.palette.success.dark,
              color: theme.palette.text.primary,
            },
            display: 'flex',
            gap: '5px',
          }}
        >
          <AccountBalanceWalletIcon />
          <Typography fontWeight="bold">
            {shortenAddress(userAddress)}
          </Typography>
        </Button>
      ) : (
        <Button
          variant="contained"
          color="warning"
          onClick={connect}
          sx={{ padding: '0px 15px' }}
          disableElevation
        >
          <MetamaskLogoText
            size="140px"
            style={{ textShadow: `1px 1px 1px ${theme.palette.common.black}` }}
          />
        </Button>
      )}
    </>
  );
}

export default WalletButton;
