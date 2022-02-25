import React, { useState, useContext, useEffect } from 'react';
import Layout from 'layout';
import { AppContext } from 'context/AppContext';
import { WalletButton, LoadingModal } from 'components';
import { ModelCardContent } from 'components/ModelCard';
import { Typography, Box, useTheme, CardMedia, Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import styled from '@emotion/styled';
import { FaRegCheckCircle } from 'react-icons/fa';
import IndigoIcon from 'svg/illustrations/IndigoIcon';
import { InstructionCard, InstructionRow } from 'components/InstructionCard';
import ReCAPTCHA from 'react-google-recaptcha';
import useContract from 'hooks/useContract';
import { getTransactionUrl } from 'utils/constants';

const IconBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// public site keys for captcha
const testSiteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
const siteKey = '6Lc-MYIeAAAAAO-XhXh9oqjIxWXptrxSP4eO3L_W';

const Airdrop = () => {
  const theme = useTheme();
  const { provider, signer, connect } = useContext(AppContext);
  const { mintFreeTrialCoins, addToMetamask } = useContract(provider, signer);
  const [isLoading, setIsLoading] = useState(false);
  const [completedCaptcha, setCompletedCaptcha] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [txUrl, setTxUrl] = useState('');
  const isSm = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const airdropDescription = {
    modelName: '$INDG One-time Airdrop',
    description:
      '$INDG is the native token of the Indigo ecosystem. We provide a small amount of free $INDG to test and experience Indigo. Follow the steps below to claim a one-time airdrop of $INDG.',
    dapps: ['default'],
  };

  useEffect(() => {
    connect();
  });

  async function handleTransaction() {
    setIsLoading(true);
    try {
      const mint = await mintFreeTrialCoins();
      setTxUrl(getTransactionUrl(mint.hash));
      await mint.wait();
      setClaimed(true);
      await addToMetamask();
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }

  function handleCaptcha(captchaValue) {
    console.log(captchaValue);
    setCompletedCaptcha(true);
  }

  return (
    <Layout hideImage noGradient>
      <LoadingModal
        isLoading={isLoading}
        message="Confirming transaction"
        href={txUrl}
      />
      <InstructionCard title="$INDG Airdrop">
        <Box display="flex">
          <ModelCardContent item={airdropDescription} hasLink={false} />
          <CardMedia
            sx={{
              width: '250px',
              padding: 4,
              filter: 'brightness(0) invert(.8)',
              display: { xs: 'none', md: 'block' },
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
            // eslint-disable-next-line no-undef
            sitekey={
              // eslint-disable-next-line no-undef
              process.env.NODE_ENV === 'development' ? testSiteKey : siteKey
            }
            onChange={handleCaptcha}
            size={isSm ? 'compact' : 'normal'}
          />
        </InstructionRow>
        <InstructionRow title="Receive $INDG Airdrop" number={3}>
          {claimed ? (
            <Box>
              <Button
                component="a"
                variant="contained"
                color="success"
                size="large"
                sx={{
                  backgroundColor: theme.palette.success.dark,
                  color: theme.palette.text.primary,
                }}
                disableElevation
                href={txUrl}
              >
                <IconBox>
                  <IndigoIcon
                    size={25}
                    style={{
                      filter: 'brightness(0) invert(1)',
                      opacity: !provider || !completedCaptcha ? '0.4' : '1',
                    }}
                  />{' '}
                  <Typography fontWeight="bold">CLAIMED</Typography>
                </IconBox>
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="warning"
              size="large"
              disableElevation
              disabled={!provider || !completedCaptcha}
              onClick={() => handleTransaction()}
            >
              <IconBox>
                <IndigoIcon
                  size={25}
                  style={{
                    filter:
                      !provider || !completedCaptcha
                        ? 'brightness(0) invert(1)'
                        : 'brightness(0.3)',
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
