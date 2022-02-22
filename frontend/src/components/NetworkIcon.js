import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import { useContract } from 'hooks';
import { IoMdPulse } from 'react-icons/io';
import { AppContext } from 'context/AppContext';

const NetworkIcon = ({ isAurora = false, fullText = false }) => {
  const theme = useTheme();
  const { provider } = useContext(AppContext);
  const { changeNetwork } = useContract(provider);
  const title = isAurora ? 'Connected' : 'Connect to Aurora Network';

  return (
    <>
      {fullText ? (
        <Button
          onClick={changeNetwork}
          size="large"
          color="primary"
          variant="contained"
          display="flex"
          sx={{ gap: 1 }}
        >
          <IoMdPulse size={30} />
          {title}
        </Button>
      ) : (
        <Tooltip arrow title={title}>
          <IconButton
            onClick={changeNetwork}
            color={isAurora ? 'inherit' : 'warning'}
            sx={{
              background: `${theme.palette.primary.dark} !important`,
            }}
          >
            <IoMdPulse size={30} />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

NetworkIcon.propTypes = {
  isAurora: PropTypes.bool,
  fullText: PropTypes.bool,
};

export default NetworkIcon;
