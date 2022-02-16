import React from 'react';
import { Container } from 'components';
import {
  Typography,
  Box,
  useTheme,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const SpacedBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 45px;
  padding: 0px 10px;
`;

const SpacedDivider = styled(Divider)`
  margin: 30px 10px;
  background: black;
`;

const InstructionRow = ({ number, title, children }) => {
  return (
    <>
      <SpacedDivider />
      <CardContent>
        <SpacedBox>
          <Typography fontWeight="bold" variant="h2">
            {number}
          </Typography>
          <Typography>{title}</Typography>
          <Box marginLeft="auto">{children}</Box>
        </SpacedBox>
      </CardContent>
    </>
  );
};

InstructionRow.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const InstructionCard = ({ title, children }) => {
  const theme = useTheme();

  return (
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
            {title}
          </Typography>
        </Box>
        <Container display="flex" justifyContent={'center'}>
          <Card
            sx={{
              padding: 2,
              maxWidth: '800px',
              minWidth: '500px',
              background: 'linear-gradient(#1E0067, #4900FF)',
            }}
          >
            {children}
          </Card>
        </Container>
      </Container>
    </Box>
  );
};

InstructionCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export { InstructionRow, InstructionCard, SpacedBox, SpacedDivider };
