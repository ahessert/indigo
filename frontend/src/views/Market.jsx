import React from 'react';
import Main from 'layouts/Main';
import Container from 'components/Container';
import {
  Jobs,
} from 'components';

const JobListing = () => {
  return (
    <Main>
      <Container>
        <Jobs />
      </Container>
    </Main>
  );
};

export default JobListing;
