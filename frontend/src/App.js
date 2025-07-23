import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ShortenerPage from './components/ShortenerPage';
import StatsPage from './components/StatsPage';

function App() {
  // Set this to true to skip registration
  const [registered] = useState(true);
  const [view, setView] = useState('shortener');

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        React URL Shortener
      </Typography>
      {view === 'shortener' ? (
        <ShortenerPage onNavigate={setView} />
      ) : (
        <StatsPage onNavigate={setView} />
      )}
    </Container>
  );
}

export default App;
