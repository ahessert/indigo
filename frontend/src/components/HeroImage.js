/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const HeroImage = ({ height = '45vh' }) => {
  return (
    <Box
      component="img"
      src={'./sky.jpeg'}
      width="100vw"
      height={height}
      sx={{
        objectFit: 'cover',
        objectPosition: 'bottom',
      }}
    />
  );
};

HeroImage.propTypes = {
  height: PropTypes.string,
};

export default HeroImage;
