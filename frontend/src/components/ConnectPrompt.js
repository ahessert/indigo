import React from 'react';
import { WalletButton } from 'components';
import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import NetworkIcon from './NetworkIcon';

const ConnectPrompt = ({ provider, chainId }) => {

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="45vh"
      gap={3}
    >
      <Typography variant="h5">
        Please connect wallet to view marketplace
      </Typography>
      {!provider && <WalletButton />}
      {!chainId && <NetworkIcon fullText />}
    </Box>
  );
};

ConnectPrompt.propTypes = {
  provider: PropTypes.any,
  chainId: PropTypes.bool,
};

export default ConnectPrompt;
