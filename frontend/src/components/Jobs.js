import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import ModelCard from 'components/ModelCard';

const mock = [
  {
    title: 'Near Defi dApp Data',
    dapps: ['sushiswap'],
    author: 'Nick Fury',
    description:
      'locavore tbh health goth street art tumblr 3 wolf moon single-origin coffee vexillologist +1 skateboard taxidermy copper mug master cleanse hexagon kitsch.',
    price: 7,
    id: 1,
  },
  {
    title: 'Near + Sushi Volume',
    dapps: ['sushiswap', 'near'],
    author: 'Jack Black',
    description:
      'locavore tbh health goth street art tumblr 3 wolf moon single-origin coffee vexillologist +1 skateboard taxidermy copper mug master cleanse hexagon kitsch.',
    price: 7,
    id: 2,
  },
  {
    title: 'Aurora + Curve',
    dapps: ['sushiswap', 'nxar', 'curve'],
    author: 'Nick Fury',
    description:
      'locavore tbh health goth street art tumblr 3 wolf moon single-origin coffee vexillologist +1 skateboard taxidermy copper mug master cleanse hexagon kitsch.',
    price: 7,
    id: 3,
  },
  {
    title: 'Aurora + Curve',
    dapps: ['sushiswap', 'twitter', 'curve', 'chainlink'],
    author: 'Nick Fury',
    description:
      'locavore tbh health goth street art tumblr 3 wolf moon single-origin coffee vexillologist +1 skateboard taxidermy copper mug master cleanse hexagon kitsch.',
    price: 7,
    id: 4,
  },
  {
    title: 'Near Defi dApp Data',
    dapps: ['twitter', 'chainlink', 'near', 'terra', 'curve'],
    author: 'Nick Fury',
    description:
      'locavore tbh health goth street art tumblr 3 wolf moon single-origin coffee vexillologist +1 skateboard taxidermy copper mug master cleanse hexagon kitsch.',
    price: 7,
    id: 5,
  },
  {
    title: 'Near + Sushi Volume',
    dapps: ['near', 'ethereum'],
    author: 'Nick Fury',
    description:
      'locavore tbh health goth street art tumblr 3 wolf moon single-origin coffee vexillologist +1 skateboard taxidermy copper mug master cleanse hexagon kitsch.',
    price: 7,
    id: 6,
  },
];

const Jobs = ({ data }) => {
  console.log(data);
  return (
    <Box>
      <Grid container spacing={4}>
        {mock.map((item, i) => (
          <ModelCard item={item} key={item.title + i} />
        ))}
      </Grid>
    </Box>
  );
};

Jobs.propTypes = {
  data: PropTypes.object,
};

export default Jobs;
