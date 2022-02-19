import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IndigoLogo from 'svg/illustrations/IndigoLogo';
import { developerDocUrl, githubUrl } from 'utils/constants';

const Footer = () => {

  const links = [
    {
      title: 'Documentation',
      uri: developerDocUrl,
    },
    {
      title: 'Github',
      uri: githubUrl,
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={1}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Box display="flex" flexWrap={'wrap'} alignItems={'center'}>
            {links.map(({ title, uri }, index) => (
              <Box marginRight={2} key={`${title}-${index}`}>
                <Link
                  underline="none"
                  component="a"
                  href={uri}
                  color="text.primary"
                  variant={'subtitle2'}
                  target='_blank'
                >
                  {title}
                </Link>
              </Box>
            ))}
          </Box>
          <Box component="a" href="/" title="Indigo" width={80}>
            <IndigoLogo />
          </Box>
        </Box>
        <Typography
          display={{ xs: 'none', md: 'block' }}
          align={'center'}
          variant={'subtitle2'}
          color="text.secondary"
        >
          &copy; 2022 Indigo
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
