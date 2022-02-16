import React, { useContext } from 'react';
import Layout from 'layout';
import Container from 'components/Container';
import { Jobs, SearchBar, WalletButton } from 'components';
import { Typography, Box } from '@mui/material';
import { AppContext } from 'context/AppContext';

const JobListing = () => {
  const { provider } = useContext(AppContext);
  console.log(WalletButton);
  console.log(provider);
  return (
    <Layout>
      <Container style={{ position: 'relative' }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          marginBottom={4}
        >
          <Box>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                textShadow:
                  '0 0 32px rgb(192 219 255 / 48%), 0 0 8px rgb(65 120 255 / 24%)',
              }}
            >
              Marketplace
            </Typography>
          </Box>
          <SearchBar />
        </Box>
        <Box>
          {/* {provider ? ( */}
          <Jobs />
          {/* ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="45vh"
              gap={3}
            >
              <Typography variant="h5">
                Please connect wallet to view marketplace
              </Typography>
              <WalletButton />
            </Box>
          )} */}
        </Box>
      </Container>
    </Layout>
  );
};

export default JobListing;
