/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import PhoneSkeletonIllustration from 'svg/illustrations/PhoneSkeleton';

const Hero = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Grid container spacing={0}>
      <Grid item container alignItems={'center'} xs={12} md={6}>
        <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
          <Box marginBottom={2}>
            <Typography
              variant="h3"
              color="text.primary"
              sx={{
                fontWeight: 700,
              }}
            >
              Indigo Placeholder
            </Typography>
          </Box>
          <Box marginBottom={3}>
            <Typography variant="h6" component="p" color="text.secondary">
              Travelling with our app is easy.
              <br />
              Join the biggest community of travellers.
            </Typography>
          </Box>
          <Box display="flex" marginTop={1} gap="20px">
            <Box
              component={Button}
              variant="contained"
              color="primary"
              size="large"
              fullWidth={!isMd}
            >
              Enter Marketplace
            </Box>
            <Box
              component={Button}
              variant="outlined"
              color="primary"
              size="large"
              fullWidth={!isMd}
            >
              Create a Model
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            maxWidth: 450,
            position: 'relative',
            marginX: 'auto',
            perspective: 1500,
            transformStyle: 'preserve-3d',
            perspectiveOrigin: 0,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              borderRadius: '2.75rem',
              boxShadow: 1,
              width: '75% !important',
              marginX: 'auto',
              transform: 'rotateY(-35deg) rotateX(15deg) translateZ(0)',
            }}
          >
            <Box>
              <Box
                position={'relative'}
                zIndex={2}
                maxWidth={1}
                height={'auto'}
                sx={{ verticalAlign: 'middle' }}
              >
                <PhoneSkeletonIllustration />
              </Box>
              <Box
                position={'absolute'}
                top={'2.4%'}
                left={'4%'}
                width={'92.4%'}
                height={'96%'}
                sx={{
                  '& .lazy-load-image-loaded': {
                    height: 1,
                    width: 1,
                  },
                }}
              >
                <Box
                  component={LazyLoadImage}
                  src={
                    theme.palette.mode === 'light'
                      ? 'https://assets.maccarianagency.com/screenshots/crypto-mobile.png'
                      : 'https://assets.maccarianagency.com/screenshots/crypto-mobile--dark.png'
                  }
                  alt="Image Description"
                  effect="blur"
                  width={1}
                  height={1}
                  sx={{
                    objectFit: 'cover',
                    borderRadius: '2.5rem',
                    filter:
                      theme.palette.mode === 'dark'
                        ? 'brightness(0.7)'
                        : 'none',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Hero;
