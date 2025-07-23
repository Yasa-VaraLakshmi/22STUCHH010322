import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const StatsPage = ({ onNavigate }) => {
  return (
    <Box>
      <Typography variant="h6">Stats page is under construction.</Typography>
      <Button variant="outlined" sx={{ mt: 2 }} onClick={() => onNavigate('shortener')}>
        Back to Shortener
      </Button>
    </Box>
  );
};

export default StatsPage;