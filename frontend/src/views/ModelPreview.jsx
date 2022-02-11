import React from 'react';
import Layout from 'layout';
import Container from 'components/Container';
import { Typography, Box, useTheme, Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';

const ModelPreview = ({ modelData }) => {
  console.log(modelData);
  const theme = useTheme();
  return (
    <Layout isLanding noGradient>
      <Box
        sx={{
          background: `linear-gradient(${theme.palette.background.paper} 10%, ${theme.palette.common.black}, ${theme.palette.background.paper})`,
        }}
        paddingTop="80px"
      >
        <Container style={{ position: 'relative' }}>
          <Box>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                textShadow:
                  '0 0 32px rgb(192 219 255 / 48%), 0 0 8px rgb(65 120 255 / 24%)',
              }}
            >
              Access Data Model
            </Typography>
          </Box>
          <Box display='flex' justifyContent={'center'}>
            <Card>
              <CardContent>something</CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

ModelPreview.propTypes = {
  modelData: PropTypes.object.isRequired,
};

export default ModelPreview;
