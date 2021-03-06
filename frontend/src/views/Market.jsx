import React, { useContext, useEffect, useState } from 'react';
import Layout from 'layout';
import Container from 'components/Container';
import { Jobs, LoadingModal } from 'components';
import { Typography, Box } from '@mui/material';
import { AppContext } from 'context/AppContext';
import { useContract } from 'hooks';

const JobListing = () => {
  const { provider, signer, connectOnLoad } = useContext(AppContext);
  const { getAllModelDescriptions } = useContract(provider, signer);
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const newModels = await getAllModelDescriptions();
      setModels(newModels);
      setIsLoading(false);
    })();
  }, [provider]);

  useEffect(()=>{
    connectOnLoad();
  },[]);

  return (
    <Layout>
      <LoadingModal
        isLoading={isLoading}
        message="Loading Data Models..."
      />
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
        {!isLoading ? (
          <Box>
            <Jobs data={models} />
          </Box>
        ) : <></>}
      </Container>
    </Layout>
  );
};

export default JobListing;
