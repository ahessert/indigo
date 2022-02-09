import React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Ellipses from 'svg/illustrations/Ellipses';

const mock = [
  {
    title: 'Near Defi dApp Data',
    dapps: ['sushiswap'],
    author: 'Nick Fury',
    description:
      'locavore tbh health goth street art tumblr 3 wolf moon single-origin coffee vexillologist +1 skateboard taxidermy copper mug master cleanse hexagon kitsch.',
    price: 7,
  },
  {
    title: 'Near + Sushi Volume',
    dapps: ['sushiswap', 'near'],
    author: 'Jack Black',
    description:
      'locavore tbh health goth street art tumblr 3 wolf moon single-origin coffee vexillologist +1 skateboard taxidermy copper mug master cleanse hexagon kitsch.',
    price: 7,
  },
  {
    title: 'Aurora + Curve',
    dapps: ['sushiswap', 'nxar', 'curve'],
    author: 'Nick Fury',
    description:
      'locavore tbh health goth street art tumblr 3 wolf moon single-origin coffee vexillologist +1 skateboard taxidermy copper mug master cleanse hexagon kitsch.',
    price: 7,
  },
  {
    title: 'Aurora + Curve',
    dapps: ['sushiswap', 'twitter', 'curve', 'chainlink'],
    author: 'Nick Fury',
    description:
      'locavore tbh health goth street art tumblr 3 wolf moon single-origin coffee vexillologist +1 skateboard taxidermy copper mug master cleanse hexagon kitsch.',
    price: 7,
  },
  {
    title: 'Near Defi dApp Data',
    dapps: ['twitter', 'chainlink', 'near', 'terra', 'curve'],
    author: 'Nick Fury',
    description:
      'locavore tbh health goth street art tumblr 3 wolf moon single-origin coffee vexillologist +1 skateboard taxidermy copper mug master cleanse hexagon kitsch.',
    price: 7,
  },
  {
    title: 'Near + Sushi Volume',
    dapps: ['near', 'ethereum'],
    author: 'Nick Fury',
    description:
      'locavore tbh health goth street art tumblr 3 wolf moon single-origin coffee vexillologist +1 skateboard taxidermy copper mug master cleanse hexagon kitsch.',
    price: 7,
  },
];

const imageMappings = {
  near: 'near.svg',
  sushiswap: 'sushiswap.svg',
  curve: 'curve.svg',
  aurora: 'aurora.png',
  twitter: 'twitter.svg',
  chainlink: 'chainlink.svg',
  terra: 'terra.svg',
  ethereum: 'eth.svg',
};

function getLogo(dapp) {
  const path = imageMappings[dapp];
  return path ? `./logo/${path}` : undefined;
}

const VerticalCard = ({ item }) => {
  const theme = useTheme();
  const imageHeight = '250px';

  function createCardMedia(dapps) {
    const [size, wrap] = dapps.length === 2 ? [150, 'nowrap'] : [130, 'wrap'];
    let ellipses = dapps.length > 4;
    let component = (
      <CardMedia
        src={getLogo(dapps[0])}
        component="img"
        sx={{ width: '80%' }}
      />
    );

    // display logic for icons
    if (dapps.length > 1) {
      let displayCount = 0;
      const icons = dapps.map((dapp, index) => {
        if (!getLogo(dapp) || displayCount >= 4) {
          ellipses = true;
          return;
        }
        displayCount += 1;
        return (
          <Box
            sx={{
              zIndex: '1',
              display: 'flex',
              justifyContent: 'center',
              width: size,
              height: size,
            }}
            key={`${dapp}-${index}`}
          >
            <img
              src={getLogo(dapp)}
              style={{
                height: '100%',
                filter:
                  'drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black)',
              }}
            />
          </Box>
        );
      });
      component = <>{icons}</>;
    }
    return (
      <Box
        height={imageHeight}
        sx={{
          borderRadius: '10px',
          display: 'flex',
          flexWrap: wrap,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {component}
        {ellipses && (
          <Box
            sx={{
              display: { xs: 'none', sm: 'block' },
              position: 'absolute',
              bottom: '0px',
              right: '45px',
              zIndex: '2',
              width: '30px',
            }}
          >
            <Ellipses />
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Grid item xs={12} sm={6} md={4} key={'d'}>
      <Box
        display={'block'}
        width={1}
        height={1}
        sx={{
          textDecoration: 'none',
          transition: 'all .2s ease-in-out',
          '&:hover': {
            transform: `translateY(-${theme.spacing(1 / 2)})`,
          },
        }}
      >
        <Box
          component={Card}
          width={1}
          height={1}
          data-aos={'fade-up'}
          data-aos-delay={1 * 100}
          data-aos-offset={100}
          data-aos-duration={600}
          flexDirection={'column'}
          display={'flex'}
          sx={{
            background: 'linear-gradient(#1E0067, #4900FF)',
            '&:hover': {
              borderRight: `${theme.spacing(1 / 2)} solid ${
                theme.palette.secondary.main
              }`,
            },
          }}
        >
          {createCardMedia(item.dapps)}
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Typography variant={'h4'} sx={{ fontWeight: 'bold' }}>
              {item.title}
            </Typography>
            <Typography variant={'h6'} sx={{ fontWeight: 500 }}>
              Author: {item.author}
            </Typography>
            <Box
              display={'flex'}
              alignItems={'center'}
              marginTop={2}
              marginBottom={3}
            >
              <Typography variant={'subtitle2'} color="text.secondary">
                {item.description}
              </Typography>
            </Box>
            <Button
              variant={'outlined'}
              size="large"
              color="secondary"
              fullWidth
            >
              <Typography variant={'h6'} fontWeight='bold'>
                Payload: {item.price} $INDG
              </Typography>
            </Button>
          </CardContent>
        </Box>
      </Box>
    </Grid>
  );
};

const Jobs = ({ data }) => {
  console.log(data);
  return (
    <Box>
      <Grid container spacing={4}>
        {mock.map((item, i) => (
          <VerticalCard item={item} i={i} key={item.title + i} />
        ))}
      </Grid>
    </Box>
  );
};

VerticalCard.propTypes = {
  item: PropTypes.shape({
    dapps: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }),
  i: PropTypes.number.isRequired,
};

Jobs.propTypes = {
  data: PropTypes.object,
};

export default Jobs;
