import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import pages from './navigation';
import { Topbar, Sidebar, Footer } from './components';
import { Container, HeroImage } from 'components';

const Main = ({ children, colorInvert = false, isLanding = false, noGradient = false }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 38,
  });

  return (
    <Box>
      <AppBar
        position={'absolute'}
        sx={{
          top: 0,
          background: `linear-gradient(${theme.palette.background.paper}, rgba(0,0,0,0))`,
        }}
        elevation={0}
      >
        <Container paddingY={1}>
          <Topbar
            onSidebarOpen={handleSidebarOpen}
            pages={pages}
            colorInvert={trigger ? false : colorInvert}
            isLanding={isLanding}
          />
        </Container>
      </AppBar>
      <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant="temporary"
        pages={pages}
      />
      <HeroImage hidden={isLanding} />
      <main
        style={{
          background: noGradient
            ? theme.palette.background.paper
            : `linear-gradient(${theme.palette.common.black}, ${theme.palette.background.paper})`,
        }}
      >
        {children}
        <Divider />
      </main>
      <Container paddingY={4}>
        <Footer />
      </Container>
    </Box>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  colorInvert: PropTypes.bool,
  bgcolor: PropTypes.string,
  isLanding: PropTypes.bool,
  noGradient: PropTypes.bool,
};

export default Main;
