import React from 'react';
import { Box, Card, Modal, Link } from '@mui/material';
import PropTypes from 'prop-types';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { keyframes } from '@emotion/react';
import { BiLinkExternal } from 'react-icons/bi';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingModal = ({ isLoading, setIsLoading, href, message }) => {
  return (
    <Modal
      open={isLoading}
      onClose={() => (setIsLoading ? setIsLoading(false) : undefined)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 1,
        }}
      >
        <Box
          padding={4}
          alignItems="center"
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Box
            display="flex"
            justifyContent="center"
            sx={{
              animation: `${rotate} 1s infinite linear`,
            }}
          >
            <AiOutlineLoading3Quarters size={40} />
          </Box>
          <Link
            underline="none"
            component="a"
            href={href}
            target="_blank"
            color="text.primary"
            variant={'h6'}
          >
            {message} {href && <BiLinkExternal size={11} />}
          </Link>
        </Box>
      </Card>
    </Modal>
  );
};

LoadingModal.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func,
  href: PropTypes.string,
  message: PropTypes.string.isRequired,
};

export default LoadingModal;
