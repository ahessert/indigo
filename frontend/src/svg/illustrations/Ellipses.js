import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

const Ellipses = ({ style }) => {
  const theme = useTheme();
  const stroke = theme.palette.text.secondary;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z"
        style={{
          fill: 'none',
          stroke: stroke,
          strokeMiterLimit: 10,
          strokeWidth: '32px',
        }}
      />
      <circle style={{ fill: stroke }} cx="256" cy="256" r="26" />
      <circle style={{ fill: stroke }} cx="346" cy="256" r="26" />
      <circle
        style={{ fill: stroke}}
        cx="166"
        cy="256"
        r="26"
      />
    </svg>
  );
};

Ellipses.propTypes = {
  style: PropTypes.object,
};

export default Ellipses;
