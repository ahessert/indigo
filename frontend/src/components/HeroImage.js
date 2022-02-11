/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

const HeroImage = ({ hidden, height }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#000',
        display: hidden ? 'none' : 'block',
      }}
      height={height ?? '45vh'}
      minHeight={height ??'45vh'}
      width="100vw"
    >
      <Box
        component={'img'}
        src={'./sky.jpeg'}
        height='100%'
        width='100%'
        sx={{
          objectFit: 'cover',
          objectPosition: 'bottom',
        }}
      />
    </Box>
  );
};

HeroImage.propTypes = {
  hidden: PropTypes.bool,
  height: PropTypes.string,
};

export default HeroImage;
