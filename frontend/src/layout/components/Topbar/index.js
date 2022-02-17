import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import IndigoLogo from 'svg/illustrations/IndigoLogo';
import IndigoIcon from 'svg/illustrations/IndigoIcon';
import { useNavigate } from 'react-router-dom';

// import ThemeModeToggler from 'components/ThemeModeToggler';

import { SingleNavItem } from './components';

const Topbar = ({
  onSidebarOpen,
  pages,
  colorInvert = false,
  enterApp = false,
}) => {
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
        sx={{ gap: '30px' }}
      >
        <Box
          display={'flex'}
          alignItems="flex-start"
          justifyContent="space-between"
          component="a"
          href="/"
          title="Indigo"
          width="185px"
          marginTop="10px"
        >
          <Box width={{ xs: '50px' }}>
            <IndigoIcon />
          </Box>
          <Box width={{ xs: '120px' }}>
            <IndigoLogo />
          </Box>
        </Box>
        <Box
          sx={{ display: { xs: 'none', md: 'flex' }, gap: '30px' }}
          alignItems={'center'}
        >
          {Object.values(pages).map((page) => {
            const key = `${page.title}-page`;
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
      {enterApp ? (
        <Button variant="contained"> Enter App</Button>
      ) : (
        <>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '15px' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/mint')}
            >
              Mint NFT Model
            </Button>
          </Box>
          <Box
            sx={{ display: { xs: 'block', md: 'none' } }}
            alignItems={'center'}
          >
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
        </>
      )}
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
