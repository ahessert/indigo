import React from 'react';
import Layout from 'layout';
import Container from 'components/Container';
import { HeroImage, Jobs, SearchBar } from 'components';
import { Typography, Box } from '@mui/material';

const JobListing = () => {
  return (
    <Layout>
      <HeroImage/>
      <Container style={{position:'relative'}}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          marginBottom={4}
        >
          <Box>
            <Typography variant="h2" fontWeight="bold">
              Marketplace
            </Typography>
          </Box>
          <SearchBar />
        </Box>
        <Box>
          <Jobs />
        </Box>
      </Container>
    </Layout>
  );
};

export default JobListing;
