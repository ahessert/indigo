import React, { useState, useContext } from 'react';
import Layout from 'layout';
import { AppContext } from 'context/AppContext';
import { WalletButton, LoadingModal } from 'components';
import { ModelCardContent } from 'components/ModelCard';
import { Typography, Box, useTheme, CardMedia, Button } from '@mui/material';
import styled from '@emotion/styled';
import { FaRegCheckCircle } from 'react-icons/fa';
import { blockExplorerUrl } from 'utils/constants';
import IndigoIcon from 'svg/illustrations/IndigoIcon';
import { InstructionCard, InstructionRow } from 'components/InstructionCard';
import ReCAPTCHA from 'react-google-recaptcha';

const IconBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Airdrop = () => {
  const theme = useTheme();
  const { provider } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [completedCaptcha, setCompletedCaptcha] = useState(false);
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

  function handleCaptcha(captchaValue){
    console.log(captchaValue);
    setCompletedCaptcha(true);
  }

  return (
    <Layout hideImage noGradient>
      <LoadingModal
        isLoading={isLoading}
        message="Confirming transaction"
        href={`${blockExplorerUrl}/tx/${'0x433b1c1e500036910f13a4d8e03ce8c29fc3cd8804d80724f4dff0add840933f'}`}
      />
      <InstructionCard>
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
        <InstructionRow title="Don't be a bot" number={2}>
          <ReCAPTCHA
            // testing site key, needs real keys and backend verification
            // see: https://developers.google.com/recaptcha/docs/display
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={handleCaptcha}
          />
        </InstructionRow>
        <InstructionRow title="Receive $INDG Airdrop" number={3}>
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
                <IndigoIcon
                  size='25'
                  style={{
                    filter: 'brightness(0) invert(1)',
                    opacity: !provider || !completedCaptcha ? '0.4' : '1',
                  }}
                />{' '}
                <Typography fontWeight="bold">CLAIMED</Typography>
              </IconBox>
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="large"
              disableElevation
              disabled={!provider || !completedCaptcha}
              onClick={() => handleTransaction()}
            >
              <IconBox>
                <IndigoIcon
                  size='25'
                  style={{
                    filter: 'brightness(0) invert(1)',
                    opacity: !provider || !completedCaptcha ? '0.4' : '1',
                  }}
                />{' '}
                <Typography fontWeight="bold">RECEIVE $INDG</Typography>
              </IconBox>
            </Button>
          )}
        </InstructionRow>
      </InstructionCard>
    </Layout>
  );
};

export default Airdrop;
