import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IndigoLogo from 'svg/illustrations/IndigoLogo';
import {WalletButton} from 'components';

import { SingleNavItem } from './components/NavItem';
import { githubUrl, developerDocUrl } from 'utils/constants';

const SidebarNav = ({ pages }) => {
  console.log(pages);
  // const {

  // } = pages;

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Box
          display={'flex'}
          component="a"
          href="/"
          title="theFront"
          width={{ xs: 100, md: 120 }}
        >
          <IndigoLogo />
        </Box>
      </Box>
      <Box paddingX={2}>
        {Object.values(pages).map((page) => {
          const key = `${page.title}-page`;
          return <SingleNavItem id={key} key={key} item={page} />;
        })}
        <SingleNavItem
          id={'documentation-page'}
          item={{ href: githubUrl, title: 'Github' }}
          target='_blank'
        />
        <SingleNavItem
          id={'documentation-page'}
          item={{ href: developerDocUrl, title: 'Documentation' }}
          target='_blank'
        />
        <Box marginY={1}>
          <WalletButton fullWidth/>
        </Box>
      </Box>
    </Box>
  );
};

SidebarNav.propTypes = {
  pages: PropTypes.object.isRequired,
};

export default SidebarNav;
