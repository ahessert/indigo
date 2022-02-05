import React from 'react';
import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';

const IndigoIcon = ({ style }) => {
  // const theme = useTheme();

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 77 77"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45.5451 76.0117C63.2791 72.6417 76.687 57.0584 76.687 38.3435C76.687 17.167 59.52 0 38.3435 0C17.167 0 0 17.167 0 38.3435C0 56.3674 12.436 71.4866 29.1956 75.5889V43.1015L45.5451 26.752V76.0117ZM29.1956 8.95332H45.5451V15.7637L29.1956 32.1132V8.95332Z"
        fill="#3F0FB7"
      />
    </svg>
  );
};

IndigoIcon.propTypes = {
  style: PropTypes.object,
};

export default IndigoIcon;
