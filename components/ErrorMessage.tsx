import React from 'react';
import { Box } from '@mui/material';

interface Props {
  message: string;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <Box fontSize="16px" color='#ffb74d' marginTop="5px">
      {message}
    </Box>
  );
}
