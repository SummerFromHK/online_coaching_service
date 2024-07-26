import React from 'react';
import { Box } from '@mui/material';

const NavBar = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ m: '10px' }}>
        <a href={`/pages/coaches/1`}>{'Coach 1 (John Doe)'}</a>
      </Box>
      <Box sx={{ m: '10px' }}>
        <a href={`/pages/coaches/2`}>{'Coach 1 (Ben Mom)'}</a>
      </Box>
      <Box sx={{ m: '10px' }}>
        <a href={`/pages/students/1`}>{'Student 1 (May Fair)'}</a>
      </Box>
      <a></a>
    </Box>
  );
};

export default NavBar;
