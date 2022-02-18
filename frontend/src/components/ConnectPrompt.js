import React from 'react';
import {  WalletButton } from 'components';
import { Typography, Box } from '@mui/material';

const ConnectPrompt = () => {

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
      <WalletButton />
    </Box>
  );
};

export default ConnectPrompt;
