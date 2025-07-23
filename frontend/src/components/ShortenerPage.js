import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import UrlInputForm from './UrlInputForm';
import axios from 'axios';

const ShortenerPage = ({ onNavigate }) => {
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleUrlSubmit = async (formData) => {
    try {
      const response = await axios.post('http://20.244.56.144/evaluation-service/shorten', {
        url: formData.url,
        title: formData.title,
        email: "yasavaralakshmi.22@ifheindia.org"
      });
      setShortUrl(response.data.shortUrl);
      setError('');
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError('Failed to shorten URL.');
    }
  };

  return (
    <Box>
      <UrlInputForm onSubmit={handleUrlSubmit} />
      {shortUrl && (
        <Box mt={2}>
          <Typography variant="h6">Shortened URL:</Typography>
          <Typography variant="body1" color="primary">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          </Typography>
        </Box>
      )}
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="outlined" sx={{ mt: 2 }} onClick={() => onNavigate('stats')}>
        View Stats
      </Button>
    </Box>
  );
};

export default ShortenerPage;
