import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const StatsPage = ({ onNavigate }) => {
  return (
    <Box>
      <Typography variant="h5">Stats Page (Coming Soon)</Typography>
      <Button sx={{ mt: 2 }} variant="outlined" onClick={() => onNavigate('shortener')}>
        Back to Shortener
      </Button>
    </Box>
  );
};

export default StatsPage;
