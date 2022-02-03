import React from 'react';
import Main from 'layouts/Main';
import Container from 'components/Container';
import { Jobs, SearchBar } from 'components';
import { Typography, Box } from '@mui/material';

const JobListing = () => {
  return (
    <Main>
      <Container>
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
    </Main>
  );
};

export default JobListing;
