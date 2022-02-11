import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import Layout from 'layout';
import { Container, HeroImage, About } from 'components';
import '../theme/meteors.css';

const Home = () => {
  const theme = useTheme();

  return (
    <Layout isLanding>
      <Box sx={{ position: 'relative' }}>
        <div className="meteor m1" />
        <div className="meteor m2" />
        <div className="meteor m3" />
        <div className="meteor m4" />

        <HeroImage height="70vh" />
        <Box
          sx={{
            position: 'absolute',
            left: { xs: '5vw', md: '15vw' },
            top: '30vh',
            textShadow: `1px 1px 1px ${theme.palette.common.black}`,
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            DEMOCRATIZING
          </Typography>
          <Typography variant="h2" fontWeight="bold">
            WEB3 DATA
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          background: `linear-gradient(${theme.palette.common.black}, ${theme.palette.background.paper})`,
        }}
      >
        <Container>
          <Box
            sx={{
              position: 'relative',
              '&::after': {
                position: 'absolute',
                content: '""',
                width: '60%',
                zIndex: 1,
                top: 0,
                left: 0,
                height: '80%',
                backgroundSize: '18px 18px',
                backgroundImage: `radial-gradient(${alpha(
                  theme.palette.primary.dark,
                  0.6,
                )} 20%, transparent 20%)`,
                opacity: 0.2,
              },
            }}
          >
            <Box position={'relative'} zIndex={2}>
              <About />
            </Box>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Home;
