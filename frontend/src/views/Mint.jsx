import React, { useState, useEffect } from 'react';
import Layout from 'layout';
import { WalletButton, LoadingModal } from 'components';
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
import { blockExplorerUrl } from 'utils/constants';
import {
  InstructionCard,
  InstructionRow,
  SpacedDivider,
} from 'components/InstructionCard';

const Mint = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(false);
  });

  const airdropDescription = {
    title: '$INDG One-time Airdrop',
    description:
      'locavore tbh health goth street art tumblr 3 wolf moon single-origin coffee vexillologist +1 skateboard taxidermy copper mug master cleanse hexagon kitsch.',
    dapps: ['default'],
  };

  return (
    <Layout hideImage noGradient>
      <LoadingModal
        isLoading={isLoading}
        message="Confirming transaction"
        href={`${blockExplorerUrl}/tx/${'0x433b1c1e500036910f13a4d8e03ce8c29fc3cd8804d80724f4dff0add840933f'}`}
      />
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
          <Grid container>
            <Grid item xs={1} paddingX={2}>
              <Typography fontWeight="bold" variant="h2">
                2
              </Typography>
            </Grid>
            <Grid item xs={11} display="flex" alignItems="center" paddingX={2}>
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
              ></TextField>
              <TextField
                id="dataUrl"
                label="Github Url (<https clone url>)"
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid marginLeft="auto" padding={2}>
              <Button variant="contained" display="flex" sx={{ gap: 1 }}>
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
