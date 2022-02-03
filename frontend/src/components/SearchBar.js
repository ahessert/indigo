import React from 'react';
import { Card, TextField, InputAdornment, Box } from '@mui/material';

const Search = () => {
  function handleSubmit(e){
    e.preventDefault();
    alert('not implemented yet');
  }

  return (
    <Card>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Box display="flex" alignItems={'center'}>
          <Box width={1} marginRight={1}>
            <TextField
              sx={{
                height: 54,
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '0 !important',
                },
              }}
              variant="outlined"
              color="primary"
              size="medium"
              placeholder="Search"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      component={'svg'}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      width={24}
                      height={24}
                      color={'primary.main'}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </form>
    </Card>
  );
};

export default Search;
