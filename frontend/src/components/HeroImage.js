/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const HeroImage = ({ hidden, height }) => {
  return (
    <Box
      component="img"
      src={'./sky.jpeg'}
      width="100vw"
      sx={{
        objectFit: 'cover',
        objectPosition: 'bottom',
        height: height ?? '45vh',
        display: hidden ? 'none' : 'block',
      }}
    />
  );
};

HeroImage.propTypes = {
  hidden: PropTypes.bool,
  height: PropTypes.string,
};

export default HeroImage;
