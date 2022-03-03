import React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import Ellipses from 'svg/illustrations/Ellipses';
import { useNavigate } from 'react-router-dom';
import formatModelName from 'utils/formatModelName';

const imageMappings = {
  near: 'near.svg',
  sushiswap: 'sushiswap.svg',
  curve: 'curve.svg',
  twitter: 'twitter.svg',
  chainlink: 'chainlink.svg',
  terra: 'terra.svg',
  ethereum: 'eth.svg',
};

function getLogo(dapp) {
  const path = imageMappings[dapp];
  return path ? `/logo/${path}` : undefined;
}

const ModelCardMedia = ({ dapps, itemsShown = 4 }) => {
  const [size, wrap] = dapps.length === 2 ? [150, 'nowrap'] : [130, 'wrap'];
  let ellipses = dapps.length > 4;
  let displayCount = 0;

  if (dapps.length === 1) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        height={{ xs: '200px', sm: '250px' }}
      >
        <CardMedia
          sx={{ maxWidth: '300px' }}
          src={getLogo(dapps[0])}
          component="img"
        />
      </Box>
    );
  }

  return (
    <Box
      height={{ xs: '200px', sm: '250px' }}
      sx={{
        borderRadius: '10px',
        display: 'flex',
        flexWrap: wrap,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        minWidth: '300px',
      }}
    >
      {dapps.map((dapp, index) => {
        if (!getLogo(dapp) || displayCount >= itemsShown) {
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
        <Tooltip title={dapps.join(', ')} arro>
          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: '10%', sm: '0px' },
              right: '45px',
              zIndex: '2',
              width: '30px',
            }}
          >
            <Ellipses />
          </Box>
        </Tooltip>
      )}
    </Box>
  );
};

const ModelCardContent = ({ item, hasLink = true, children }) => {
  const navigate = useNavigate();
  const { description, address, modelName, feeTotal, url } = item;

  return (
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Typography variant={'h4'} sx={{ fontWeight: 'bold' }}>
        {formatModelName(modelName)}
      </Typography>
      {address && (
        <Typography variant={'h6'} sx={{ fontWeight: 500 }}>
          Author: {address}
        </Typography>
      )}
      <Box marginTop={2} marginBottom={3} height="100px">
        <Typography variant={'subtitle2'} color="text.secondary">
          {description}
        </Typography>
        {children}
      </Box>
      {feeTotal && url === '312' && (
        <Button
          variant={'outlined'}
          color="secondary"
          disabled
          fullWidth
          size="large"
        >
          <Typography variant={'h6'} fontWeight="bold">
            Coming Soon
          </Typography>
        </Button>
      )}

      {feeTotal && hasLink && url !== '312' && (
        <Button
          variant={'outlined'}
          size="large"
          color="secondary"
          onClick={() => navigate(`/market/${modelName}`)}
          fullWidth
        >
          <Typography variant={'h6'} fontWeight="bold">
            Payload: {feeTotal} $INDG
          </Typography>
        </Button>
      )}
      {feeTotal && !hasLink && url !== '312' ? (
        <Typography variant={'h6'} color="secondary" fontWeight="bold">
          Access: {feeTotal} $INDG
        </Typography>
      ) : (
        <></>
      )}
    </CardContent>
  );
};

const ModelCard = ({ item }) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box
        display={'block'}
        width={1}
        minWidth={{ xs: '550px', sm: '0' }}
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
          <ModelCardContent item={item} />
        </Box>
      </Box>
    </Grid>
  );
};

ModelCard.propTypes = {
  item: PropTypes.shape({
    dapps: PropTypes.arrayOf(PropTypes.string).isRequired,
    modelName: PropTypes.string.isRequired,
    address: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string.isRequired,
    feeTotal: PropTypes.string,
  }).isRequired,
};

ModelCardMedia.propTypes = {
  dapps: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemsShown: PropTypes.number,
};

ModelCardContent.propTypes = {
  item: PropTypes.shape({
    modelName: PropTypes.string.isRequired,
    address: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string.isRequired,
    feeTotal: PropTypes.string,
  }).isRequired,
  hasLink: PropTypes.bool,
  children: PropTypes.node,
};

export { ModelCardContent, ModelCardMedia };
export default ModelCard;
