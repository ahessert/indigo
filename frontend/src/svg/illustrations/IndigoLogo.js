import React from 'react';
import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';

const IndigoLogo = ({style}) => {
  // const theme = useTheme();

  return (
    <svg
      width="100%"
      viewBox="0 0 175 99"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7804 12.0426H0.806396V29.0045L12.7804 17.0305V12.0426ZM12.7804 25.078L0.806396 37.0521V61.6493H12.7804V25.078Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M108.002 12.0426H96.0283V29.0044L108.002 17.0304V12.0426ZM108.002 25.078L96.0283 37.052V61.6493H108.002V25.078Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M77.4972 12.1412V61.6493H89.4712V0.167143L77.4972 12.1412Z"
        fill="white"
      />
      <circle cx="69.0868" cy="47.252" r="14.3973" fill="white" />
      <circle cx="160.603" cy="47.252" r="14.3973" fill="white" />
      <rect
        x="129.67"
        y="47.1094"
        width="11.974"
        height="35.9221"
        fill="white"
      />
      <circle cx="127.246" cy="47.252" r="14.3973" fill="white" />
      <circle cx="127.246" cy="84.0293" r="14.3973" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.7675 37.5147V61.6493H30.7415V40.1232C31.1543 40.0308 31.5837 39.982 32.0244 39.982C35.2522 39.982 37.8688 42.5986 37.8688 45.8265C37.8688 46.0677 37.8542 46.3056 37.8258 46.5392H37.8688V61.4462C37.8688 61.4462 37.8689 61.4462 37.8689 61.4462V61.6493H49.8429V47.1094H49.8422C49.7657 39.2236 43.3494 32.8546 35.4455 32.8546C33.7983 32.8546 32.2156 33.1312 30.7415 33.6406V25.5406L18.7675 37.5147Z"
        fill="white"
      />
    </svg>
  );
};

IndigoLogo.propTypes = {
  style: PropTypes.Object,
};


export default IndigoLogo;
