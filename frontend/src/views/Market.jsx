import React, { useContext, useEffect, useState } from 'react';
import Layout from 'layout';
import Container from 'components/Container';
import { Jobs } from 'components';
import { Typography, Box } from '@mui/material';
import { AppContext } from 'context/AppContext';
import { useContract } from 'hooks';
import { CHAIN_ID } from 'utils/constants';

const JobListing = () => {
  const { provider, signer } = useContext(AppContext);
  const { getAllModelDescriptions, getChainId } = useContract(provider, signer);
  const [models, setModels] = useState([]);
  const [chainId, setChainId] = useState('');
  console.log(chainId, CHAIN_ID);

  useEffect(() => {
    (async () => {
      const newModels = await getAllModelDescriptions();
      setModels(newModels);
      if (!provider) return;
      const newChainId = await getChainId();
      setChainId(newChainId);
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
        <Box>
          <Jobs data={models} />
        </Box>
      </Container>
    </Layout>
  );
};

export default JobListing;
