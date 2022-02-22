import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import IndigoLogo from 'svg/illustrations/IndigoLogo';
import IndigoIcon from 'svg/illustrations/IndigoIcon';
import { WalletButton } from 'components';
import { useContract } from 'hooks';
import { IoMdPulse } from 'react-icons/io';
import { AppContext } from 'context/AppContext';
import { CHAIN_ID } from 'utils/constants';
import { SingleNavItem } from './components/NavItem';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ onSidebarOpen, pages, colorInvert = false }) => {
  const theme = useTheme();
  const { provider } = useContext(AppContext);
  const [isAurora, setIsAurora] = useState(false);
  const { addToMetamask, changeNetwork } = useContract(provider);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (provider) {
        const { chainId } = await provider.getNetwork();
        if (chainId === CHAIN_ID) {
          setIsAurora(true);
        } else {
          setIsAurora(false);
        }
      }
    })();
  }, [provider]);

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
          href="https://indigodapp.com/"
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
        <Tooltip arrow title="Connect to Aurora Network">
          <IconButton
            onClick={()=>changeNetwork()}
            color={isAurora ? 'inherit' : 'warning'}
            sx={{
              background: `${theme.palette.primary.dark} !important`,
            }}
          >
            <IoMdPulse size={30} />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title="Add $INDG to Metamask">
          <IconButton
            onClick={addToMetamask}
            sx={{
              background: `${theme.palette.primary.dark} !important`,
            }}
          >
            <IndigoIcon
              size={30}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </IconButton>
        </Tooltip>
        <Button
          variant="contained"
          sx={{
            color: theme.palette.text.primary,
            background: `linear-gradient( to right, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
            fontWeight: 'bold',
          }}
          onClick={() => navigate('/mint')}
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
