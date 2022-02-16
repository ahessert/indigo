import React, { useState, useContext } from 'react';
import Layout from 'layout';
import { AppContext } from 'context/AppContext';
import { Container, WalletButton, LoadingModal } from 'components';
import { ModelCardContent } from 'components/ModelCard';
import {
  Typography,
  Box,
  useTheme,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Button,
} from '@mui/material';
import styled from '@emotion/styled';
import { FaRegCheckCircle } from 'react-icons/fa';
import { blockExplorerUrl } from 'utils/constants';
import IndigoIcon from 'svg/illustrations/IndigoIcon';
import PropTypes from 'prop-types';

const SpacedBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 45px;
  padding: 0px 10px;
`;

const SpacedDivider = styled(Divider)`
  margin: 30px 10px;
  background: black;
`;

const IconBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InstructionRow = ({ number, title, children }) => {
  return (
    <>
      <SpacedDivider />
      <CardContent>
        <SpacedBox>
          <Typography fontWeight="bold" variant="h2">
            {number}
          </Typography>
          <Typography>{title}</Typography>
          <Box marginLeft="auto">{children}</Box>
        </SpacedBox>
      </CardContent>
    </>
  );
};

InstructionRow.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

// split out box logic into reusable container
// const InstructionBox = () => {
// };

const Airdrop = () => {
  const theme = useTheme();
  const { provider } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const airdropDescription = {
    title: '$INDG One-time Airdrop',
    description:
      'locavore tbh health goth street art tumblr 3 wolf moon single-origin coffee vexillologist +1 skateboard taxidermy copper mug master cleanse hexagon kitsch.',
    dapps: ['default'],
  };

  function handleTransaction() {
    setIsLoading(true);
    setClaimed(true);
    setIsLoading(false);
  }

  return (
    <Layout hideImage noGradient>
      <LoadingModal
        isLoading={isLoading}
        message="Confirming transaction"
        href={`${blockExplorerUrl}/tx/${'0x433b1c1e500036910f13a4d8e03ce8c29fc3cd8804d80724f4dff0add840933f'}`}
      />
      <Box
        sx={{
          background: `linear-gradient(${theme.palette.background.paper} , ${theme.palette.common.black} 15%, ${theme.palette.background.paper})`,
        }}
        paddingTop="80px"
      >
        <Container style={{ position: 'relative' }}>
          <Box>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                textShadow:
                  '0 0 32px rgb(192 219 255 / 48%), 0 0 8px rgb(65 120 255 / 24%)',
              }}
            >
              $INDG Airdrop
            </Typography>
          </Box>
          <Container display="flex" justifyContent={'center'}>
            <Card
              sx={{
                padding: 2,
                maxWidth: '800px',
                minWidth: '500px',
                background: 'linear-gradient(#1E0067, #4900FF)',
              }}
            >
              <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
                <ModelCardContent item={airdropDescription} hasLink={false} />
                <CardMedia
                  sx={{
                    maxWidth: '250px',
                    padding: 4,
                    filter: 'brightness(0) invert(1)',
                  }}
                  src={'/logo/default.svg'}
                  component="img"
                />
              </Box>
              <InstructionRow title="Connect Wallet to Indigo" number={1}>
                <WalletButton Icon={FaRegCheckCircle} size={25} />
              </InstructionRow>
              <InstructionRow title="Receive $INDG Airdrop" number={2}>
                {claimed ? (
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    sx={{
                      backgroundColor: theme.palette.success.dark,
                      color: theme.palette.text.primary,
                    }}
                    disableElevation
                    onClick={() => {
                      // open tabs to aurora etherscan
                      console.log('TO ETHERSCAN!');
                    }}
                  >
                    <IconBox>
                      <IndigoIcon size={25} />{' '}
                      <Typography fontWeight="bold">CLAIMED</Typography>
                    </IconBox>
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disableElevation
                    disabled={!provider}
                    onClick={() => handleTransaction()}
                  >
                    <IconBox>
                      <IndigoIcon
                        size={25}
                        style={{
                          filter: 'brightness(0) invert(1)',
                          opacity: !provider ? '0.4' : '1',
                        }}
                      />{' '}
                      <Typography fontWeight="bold">CLAIM</Typography>
                    </IconBox>
                  </Button>
                )}
              </InstructionRow>
            </Card>
          </Container>
        </Container>
      </Box>
    </Layout>
  );
};

export default Airdrop;
