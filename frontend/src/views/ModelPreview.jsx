import React from 'react';
import Layout from 'layout';
import { Container, WalletButton } from 'components';
import { ModelCardMedia, ModelCardContent } from 'components/ModelCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Typography,
  Box,
  useTheme,
  Card,
  CardContent,
  Divider,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const mockData = {
  title: 'Aurora + Curve',
  dapps: ['sushiswap', 'twitter', 'curve', 'chainlink', 'near'],
  author: 'Nick Fury',
  description:
    'locavore tbh health goth street art tumblr 3 wolf moon single-origin coffee vexillologist +1 skateboard taxidermy copper mug master cleanse hexagon kitsch.',
  price: 7,
  id: 4,
};

const SpacedBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModelPreview = () => {
  const theme = useTheme();
  const { id } = useParams();
  console.log(id);
  const modelData = mockData;
  const isXs = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Layout isLanding noGradient>
      <Box
        sx={{
          background: `linear-gradient(${theme.palette.background.paper} , ${theme.palette.common.black} 15%, ${theme.palette.background.paper})`,
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
          <Container display="flex" justifyContent={'center'}>
            <Card sx={{ padding: 2, maxWidth: '800px', minWidth: '500px' }}>
              <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
                <ModelCardContent item={modelData} hasLink={false} />
                <ModelCardMedia
                  dapps={modelData.dapps}
                  itemsShown={isXs ? 3 : 4}
                />
              </Box>
              <Divider />
              <CardContent>
                <SpacedBox>
                  <Typography>Connect metamask</Typography>
                  <WalletButton />
                </SpacedBox>
              </CardContent>
              <Divider />
              <CardContent>
                <SpacedBox>
                  <Typography>Confirm</Typography>
                  <Button>confirm button</Button>
                </SpacedBox>
              </CardContent>
              <Divider />
              <CardContent>
                <Typography>Download or airtable</Typography>
                <SpacedBox>
                  <Button>download button</Button>
                  <Button>airtable button</Button>
                </SpacedBox>
              </CardContent>
            </Card>
          </Container>
        </Container>
      </Box>
    </Layout>
  );
};

ModelPreview.propTypes = {
  modelData: PropTypes.object,
};

export default ModelPreview;
