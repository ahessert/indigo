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
import { useNavigate } from 'react-router-dom';

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

const ModelCardMedia = ({ dapps }) => {
  const [size, wrap] = dapps.length === 2 ? [150, 'nowrap'] : [130, 'wrap'];
  const imageHeight = '250px';
  let ellipses = dapps.length > 4;
  let displayCount = 0;
	
  if (dapps.length === 1) {
    return (
      <CardMedia
        src={getLogo(dapps[0])}
        component="img"
      />
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
        position: 'relative',
      }}
    >
      {dapps.map((dapp, index) => {
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
      })}
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
};

const ModelCard = ({ item }) => {
  const navigate = useNavigate();
  const theme = useTheme();

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
          <ModelCardMedia dapps={item.dapps} />
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
              onClick={() => navigate(`/market/${item.id}`)}
              fullWidth
            >
              <Typography variant={'h6'} fontWeight="bold">
                Payload: {item.price} $INDG
              </Typography>
            </Button>
          </CardContent>
        </Box>
      </Box>
    </Grid>
  );
};

ModelCard.propTypes = {
  item: PropTypes.shape({
    dapps: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }),
};

ModelCardMedia.propTypes = {
  dapps: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ModelCard;
