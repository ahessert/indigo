import React from 'react';
import Layout from 'layout';
import Container from 'components/Container';
import { Table } from 'components';
import { Typography, Box } from '@mui/material';

const DisplayData = () => {
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
							Data
            </Typography>
          </Box>
        </Box>
        <Box>
          <Table />
        </Box>
      </Container>
    </Layout>
  );
};

export default DisplayData;
