import React from 'react';
import { Box, Card, Modal, Link } from '@mui/material';
import PropTypes from 'prop-types';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { keyframes } from '@emotion/react';
import { BiLinkExternal } from 'react-icons/bi';
import { FaRegCheckCircle } from 'react-icons/fa';

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
    <GenericModal isOpen={isLoading} setIsOpen={setIsLoading}>
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
    </GenericModal>
  );
};

const SuccessModal = ({ isOpen, setIsOpen, href, message }) => {
  return (
    <GenericModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Box
        display="flex"
        justifyContent="center"
      >
        <FaRegCheckCircle size={40} />
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
    </GenericModal>
  );
};

const GenericModal = ({ children, isOpen, setIsOpen }) => {
  return (
    <Modal
      open={isOpen}
      onClose={() => (setIsOpen ? setIsOpen(false) : undefined)}
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
          {children}
        </Box>
      </Card>
    </Modal>
  );
};

GenericModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func,
  children: PropTypes.node.isRequired,
};

SuccessModal.propTypes = {
  isOpen: PropTypes.any.isRequired,
  setIsOpen: PropTypes.func,
  href: PropTypes.string,
  message: PropTypes.string.isRequired,
};

LoadingModal.propTypes = {
  isLoading: PropTypes.any.isRequired,
  setIsLoading: PropTypes.func,
  href: PropTypes.string,
  message: PropTypes.string.isRequired,
};

export { GenericModal, LoadingModal, SuccessModal };
