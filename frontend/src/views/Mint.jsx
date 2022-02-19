import React, { useState, useEffect, useContext } from 'react';
import Layout from 'layout';
import { WalletButton, LoadingModal, GenericModal } from 'components';
import { ModelCardContent } from 'components/ModelCard';
import {
  Box,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
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

const Mint = () => {
  const { provider, signer } = useContext(AppContext);
  const { mintModel } = useContract(signer);
  const [isLoading, setIsLoading] = useState(false);
  const [modelName, setModelName] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const airdropDescription = {
    modelName: 'Upload Data Model',
    description:
      'locavore tbh health goth street art tumblr 3 wolf moon single-origin coffee vexillologist +1 skateboard taxidermy copper mug master cleanse hexagon kitsch.',
    dapps: ['default'],
  };

  async function handleSubmit() {
    setIsLoading(true);
    try {
      await mintModel(modelName, githubUrl);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
    setIsOpen(true);
  }

  return (
    <Layout hideImage noGradient>
      <LoadingModal isLoading={isLoading} message="Confirming transaction" />
      <GenericModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <FaRegCheckCircle size={40}/>
        <Typography variant='h6'>
          Model successfully minted!
        </Typography>
      </GenericModal>
      <InstructionCard>
        <Box display="flex">
          <ModelCardContent item={airdropDescription} hasLink={false} />
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
          <FormControl onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={1} paddingX={2}>
                <Typography fontWeight="bold" variant="h2">
                  2
                </Typography>
              </Grid>
              <Grid
                item
                xs={11}
                display="flex"
                alignItems="center"
                paddingX={2}
              >
                <Typography>Mint Data Model NFT</Typography>
              </Grid>
              <Grid item xs={1} paddingX={2}></Grid>
              <Grid
                item
                xs={11}
                display="flex"
                flexDirection={'column'}
                gap={2}
                paddingX={2}
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
                  display="flex"
                  sx={{ gap: 1 }}
                  onClick={handleSubmit}
                  disabled={!provider}
                >
                  <BsFillGearFill />
                  <Typography>MINT NFT</Typography>
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </InstructionCard>
    </Layout>
  );
};

export default Mint;
