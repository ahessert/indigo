/* eslint-disable react/no-unescaped-entities */
import React from 'react';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';

const About = () => {
  const theme = useTheme();
  console.log(theme);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Box>
          <Typography variant="h2">This is an example text</Typography>
          <Typography variant="body1">
            I'm baby 8-bit pok pok palo santo offal knausgaard distillery mlkshk
            poutine. Godard hot chicken butcher, enamel pin paleo austin
            readymade deep v. Banh mi wayfarers squid pitchfork, beard fashion
            axe retro jianbing fingerstache. Helvetica cloud bread pickled
            drinking vinegar 8-bit, kickstarter artisan shabby chic cornhole
            distillery skateboard seitan.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default About;
