import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();
  const { mode } = theme.palette;

  const links = [
    {
      title: 'Documentation',
      uri: 'https://www.github.com',
    },
    {
      title: 'Github',
      uri: 'https://www.github.com',
    },
    {
      title: 'Discord',
      uri: 'https://www.discord.com',
    },
    {
      title: 'Twitter',
      uri: 'https://www.twitter.com',
    },
    {
      title: 'Telegram',
      uri: 'https://www.telegram.com',
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
          <Box
            display={'flex'}
            component="a"
            href="/"
            title="theFront"
            width={80}
          >
            <Box
              component={'img'}
              src={
                mode === 'light' ? './indigo_light.png' : './indigo_dark.png'
              }
              height={1}
              width={1}
            />
          </Box>
          <Box display="flex" flexWrap={'wrap'} alignItems={'center'}>
            {links.map(({ title, uri }, index) => (
              <Box marginTop={1} marginRight={2} key={`${title}-${index}`}>
                <Link
                  underline="none"
                  component="a"
                  href={uri}
                  color="text.primary"
                  variant={'subtitle2'}
                >
                  {title}
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          align={'center'}
          variant={'subtitle2'}
          color="text.secondary"
          gutterBottom
        >
          &copy; Indigo. 2021, All rights reserved
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
