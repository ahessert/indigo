import React, { useState, useEffect, useContext } from 'react';
import Layout from 'layout';
import { WalletButton, LoadingModal, SuccessModal } from 'components';
import { ModelCardContent } from 'components/ModelCard';
import {
  Box,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { FaRegCheckCircle } from 'react-icons/fa';
import { BsFillGearFill } from 'react-icons/bs';
import {
  InstructionCard,
  InstructionRow,
  SpacedDivider,
} from 'components/InstructionCard';
import { useContract } from 'hooks';
import { AppContext } from 'context/AppContext';
import { getTransactionUrl, developerDocUrl } from 'utils/constants';
import { useTheme } from '@mui/material/styles';

const Mint = () => {
  const { provider, signer, connect } = useContext(AppContext);
  const { mintModel } = useContract(provider, signer);
  const [isLoading, setIsLoading] = useState(false);
  const [modelName, setModelName] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [txUrl, setTxUrl] = useState('');
  const theme = useTheme();

  useEffect(() => {
    connect();
  }, []);

  const airdropDescription = {
    modelName: 'Upload Data Model',
    dapps: ['default'],
  };

  async function handleSubmit() {
    setIsLoading(true);
    try {
      const mint = await mintModel(modelName, githubUrl);
      setTxUrl(getTransactionUrl(mint.hash));
      await mint.wait();
      setIsLoading(false);
      setIsOpen(true);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  }

  return (
    <Layout hideImage noGradient>
      <LoadingModal
        isLoading={isLoading}
        href={txUrl}
        message="Confirming transaction"
      />
      <SuccessModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        message="Model Successfully Minted!"
        href={txUrl}
      />
      <InstructionCard title={'Mint Model'}>
        <Box display="flex">
          <ModelCardContent item={airdropDescription} hasLink={false}>
            Use this page to upload your data models that will be placed on the
            Indigo Marketplace. Currently the price is set, but custom pricing
            will become available in the NEAR future. For detailed steps on how
            simple it is to create and mint these data models, please see our{' '}
            <a href={developerDocUrl} style={{ color: theme.palette.text.primary }}>
              developer documentation.
            </a>
          </ModelCardContent>
          <CardMedia
            sx={{
              maxWidth: '250px',
              height: '100%',
              padding: 4,
              objectFit: 'cover',
              display: { xs: 'none', md: 'block' },
            }}
            src={'/indigoGearIcon.svg'}
            component="img"
          />
        </Box>
        <InstructionRow title="Connect Wallet to Indigo" number={1}>
          <WalletButton Icon={FaRegCheckCircle} size={25} />
        </InstructionRow>
        <SpacedDivider />
        <CardContent>
          <Grid container>
            <Grid item xs={1} paddingX={2}>
              <Typography
                fontWeight="bold"
                variant="h2"
                sx={{
                  textShadow:
                    '0 0 32px rgb(192 219 255 / 48%), 0 0 8px rgb(65 120 255 / 24%)',
                }}
              >
                2
              </Typography>
            </Grid>
            <Grid item xs={11} display="flex" alignItems="center" paddingX={3}>
              <Typography>Mint Data Model NFT</Typography>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid
              item
              xs={11}
              display="flex"
              flexDirection={'column'}
              gap={2}
              paddingX={3}
            >
              <TextField
                id="dataName"
                label="Data Model Name"
                variant="outlined"
                onChange={(e) => setModelName(e.target.value)}
                value={modelName}
              ></TextField>
              <TextField
                id="dataUrl"
                label="Github Url (<https clone url>)"
                variant="outlined"
                onChange={(e) => setGithubUrl(e.target.value)}
                value={githubUrl}
              ></TextField>
            </Grid>
            <Grid marginLeft="auto" padding={2}>
              <Button
                variant="contained"
                color="warning"
                display="flex"
                sx={{ gap: 1, minWidth: '200px' }}
                onClick={handleSubmit}
                disabled={!provider}
              >
                <BsFillGearFill />
                <Typography>MINT NFT</Typography>
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </InstructionCard>
    </Layout>
  );
};

export default Mint;
