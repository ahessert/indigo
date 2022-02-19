import React, { useContext, useEffect, useState } from 'react';
import Layout from 'layout';
import Container from 'components/Container';
import { Jobs, ConnectPrompt } from 'components';
import { Typography, Box } from '@mui/material';
import { AppContext } from 'context/AppContext';
import { useContract } from 'hooks';

const JobListing = () => {
  const { provider, signer } = useContext(AppContext);
  const { getAllModelDescriptions } = useContract(provider, signer);
  const [models, setModels] = useState([]);

  useEffect(() => {
    (async () => {
      if (!provider) return;
      const newModels = await getAllModelDescriptions();
      setModels(newModels);
    })();
  }, [provider]);

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
        </Box>
        <Box>{provider ? <Jobs data={models} /> : <ConnectPrompt />}</Box>
      </Container>
    </Layout>
  );
};

export default JobListing;
