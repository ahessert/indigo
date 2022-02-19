import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import IndigoLogo from 'svg/illustrations/IndigoLogo';
import { WalletButton } from 'components';

// import ThemeModeToggler from 'components/ThemeModeToggler';

import { SingleNavItem } from './components/NavItem';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ onSidebarOpen, pages, colorInvert = false }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      marginTop="10px"
    >
      <Box
        display={'flex'}
        justifyContent={{ xs: 'space-between', md: 'flex-start' }}
        alignItems="center"
        sx={{ gap: 2 }}
      >
        <Box
          display={'flex'}
          alignItems="flex-start"
          justifyContent="space-between"
          component="a"
          href="https://www.indigodapp.com"
          target="_blank"
          title="Indigo"
          width="120px"
          marginX={2}
        >
          <IndigoLogo />
        </Box>
        <Box
          sx={{ display: { xs: 'none', md: 'flex' }, gap: '30px' }}
          alignItems={'center'}
        >
          {Object.values(pages).map((page) => {
            const key = `${page.title}-page`;
            console.log(page);
            return (
              <SingleNavItem
                id={key}
                key={key}
                items={page}
                colorInvert={colorInvert}
              />
            );
          })}
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
        <Button
          variant="contained"
          sx={{
            color: theme.palette.text.primary,
            background: `linear-gradient( to right, ${
              theme.palette.secondary.main
            }, ${theme.palette.secondary.dark})`,
            fontWeight: 'bold',
          }}
          onClick={()=>navigate('/mint')}
        >
          Mint NFT Model
        </Button>
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
  enterApp: PropTypes.bool,
};

export default Topbar;
