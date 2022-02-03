import React from 'react';
import { useTheme } from '@mui/material/styles';
import { colors } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

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
    dapps: ['sushiswap', 'near', 'curve'],
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
    dapps: ['twitter', 'chainlink', 'near'],
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

const randomColors = [
  colors.purple[500],
  colors.red[500],
  colors.green[500],
  colors.indigo[500],
  colors.pink[500],
  colors.amber[500],
  colors.blue[500],
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
  const path = imageMappings[dapp] ?? 'default.jpeg';
  return `./logo/${path}`;
}

const VerticalCard = ({ item, i }) => {
  const theme = useTheme();
  const imageHeight = '250px';

  function createCardMedia(dapps) {
    const [size, wrap] = dapps.length === 2 ? [150, 'nowrap'] : [130, 'wrap'];
    let component = (
      <CardMedia src={getLogo(dapps[0])} component="img" height="100%" />
    );

    if (dapps.length > 1) {
      component = (
        <>
          {dapps.map((dapp, index) => (
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
          ))}
        </>
      );
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
        }}
      >
        {component}
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
            '&:hover': {
              borderRight: `${theme.spacing(1 / 2)} solid ${randomColors[i]}`,
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
            <Button variant={'contained'} size="large" fullWidth>
              Payload: {item.price} $INDG
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
