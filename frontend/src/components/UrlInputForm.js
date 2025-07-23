import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

const UrlInputForm = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url || !title) return;
    onSubmit({ url, title });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Original URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Shorten
      </Button>
    </Box>
  );
};

export default UrlInputForm;
