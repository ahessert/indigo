import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import ModelCard from 'components/ModelCard';

const mock = [
  {
    modelName: 'Sushi Defi dApp Data',
    dapps: ['sushiswap'],
    address: '0x12345',
    description:
      'SushiSwap is a software running on Ethereum that seeks to incentivize a network of users to operate a platform where users can buy and sell crypto assets. ',
    feeTotal: '7',
    url:'312'
  },
  {
    modelName: 'Near + Sushi Volume',
    dapps: ['sushiswap', 'near'],
    address: '0x12345',
    description:
      'Near Protocol, a smart contract-enabled blockchain just like Ethereum, was launched in 2020 to incentivise developers to create and launch more decentralised applications.',
    feeTotal: '7',
    url:'312'
  },
  {
    modelName: 'Aurora + Curve',
    dapps: ['aurora', 'curve'],
    address: '0x12345',
    description:
      'Curve is a exchange protocol based on Ethereum, providing stablecoin transactions with low slippage.',
    feeTotal: '7',
    url:'312'
  },
  {
    modelName: 'Data Correlation',
    dapps: ['sushiswap', 'twitter', 'curve', 'chainlink'],
    address: '0x12345',
    description:
      'Chainlink is a decentralized oracle network that provides real-world data to smart contracts on the blockchain.',
    feeTotal: '7',
    url:'312'
  },
  {
    modelName: 'Ecosystem data',
    dapps: ['twitter', 'chainlink', 'near', 'terra', 'curve'],
    address: '0x12345',
    description:
      'Terra is an open-source blockchain platform for algorithmic stablecoins, that are pegged against traditional fiat.',
    feeTotal: '7',
    url:'312'
  },
];

const Jobs = ({ data }) => {
  data=data.concat(mock);
  return (
    <Box>
      <Grid container spacing={4} height='100%'>
        {data.map((item, i) => (
          <ModelCard item={item} key={item.modelName + i} />
        ))}
      </Grid>
    </Box>
  );
};

Jobs.propTypes = {
  data: PropTypes.array,
};

export default Jobs;
