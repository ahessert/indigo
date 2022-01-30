import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
// import ThemeModeToggler from 'components/ThemeModeToggler';

import { SingleNavItem, MultiNavItem } from './components';
import { WalletButton } from 'components';

const Topbar = ({ onSidebarOpen, pages, colorInvert = false }) => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const { explore, market, developers } = pages;

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      marginY="10px"
    >
      <Box
        display={'flex'}
        justifyContent={{ xs: 'space-between', md: 'flex-start' }}
      >
        <Box
          display={'flex'}
          component="a"
          href="/"
          title="theFront"
          width="100px"
        >
          <Box
            component={'img'}
            src={
              mode === 'light' && !colorInvert
                ? './indigo_logo.png'
                : './indigo_logo.png'
            }
            height='70px'
            width='70px'
          />
        </Box>
        <Box
          sx={{ display: { xs: 'none', md: 'flex' }, gap: '30px' }}
          alignItems={'center'}
        >
          <MultiNavItem
            title={'Explore'}
            id={'explore-pages'}
            items={explore}
            colorInvert={colorInvert}
          />
          <SingleNavItem
            id={'market-page'}
            items={market}
            colorInvert={colorInvert}
          />
          <SingleNavItem
            id={'developer-page'}
            items={developers}
            colorInvert={colorInvert}
          />
        </Box>
      </Box>
      <Box sx={{display: {xs:'none', md:'block'}}}>
        <WalletButton />
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }} alignItems={'center'}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant={'outlined'}
          sx={{
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object,
  colorInvert: PropTypes.bool,
};

export default Topbar;
