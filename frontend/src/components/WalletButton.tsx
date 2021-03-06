import React, { useContext } from 'react';
import { AppContext } from 'context/AppContext';
import { Button, Typography, useTheme } from '@mui/material';
import shortenAddress from 'utils/shortenAddress';
import MetamaskLogoText from 'svg/illustrations/MetamaskLogoText';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PropTypes from 'prop-types';

function WalletButton({
  Icon,
  size,
  sx,
  ...props
}: {
  Icon: React.ComponentClass<any>;
  size: number;
  sx: {};
}) {
  const theme = useTheme();
  const { connect, disconnect, provider, userAddress } =
    useContext<any>(AppContext);

  return (
    <>
      {provider ? (
        <Button
          variant="contained"
          size="large"
          onClick={disconnect}
          disableElevation
          sx={{
            backgroundColor: theme.palette.success.dark,
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: theme.palette.success.dark,
              color: theme.palette.text.primary,
            },

            display: 'flex',
            gap: '10px',
            ...sx,
          }}
          {...props}
        >
          {Icon ? <Icon size={size} /> : <AccountBalanceWalletIcon />}
          <Typography fontWeight="bold">
            {shortenAddress(userAddress)}
          </Typography>
        </Button>
      ) : (
        <Button
          variant="contained"
          color="warning"
          onClick={connect}
          sx={{ padding: '0px 15px', ...sx }}
          disableElevation
          {...props}
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

WalletButton.propTypes = {
  Icon: PropTypes.any,
  size: PropTypes.number,
  sx: PropTypes.object,
};

export default WalletButton;
