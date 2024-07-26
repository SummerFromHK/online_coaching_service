import React from 'react';
import { Box } from '@mui/material';

const Tag = ({
  text,
  backgroundColor,
}: {
  text: string;
  backgroundColor?: string;
}) => {
  return (
    <Box
      sx={{
        width: '70px',
        mt: '7px',
        p: 0.7,
        borderRadius: '10px',
        border: '1px solid grey',
        fontSize: '14px',
        textAlign: 'center',
        backgroundColor: backgroundColor || 'green',
        color: 'white',
      }}
    >
      {text}
    </Box>
  );
};

export default Tag;
