import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://sufilatestbe.vercel.app/v2/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming the backend returns a token for authentication
        setIsAuthenticated(true);
        localStorage.setItem('token', data.token); // Store the token

        // Optionally, store the authenticated state
        localStorage.setItem('isAuthenticated', 'true');

        // Redirect to the homepage
        navigate('/');
      } else {
        // Display an error message from the server response
        setError(data.message || 'Invalid login credentials.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <Box sx={{ width: '300px', margin: '100px auto', textAlign: 'center' }}>
      <Typography variant="h4" mb={3}>
        Login
      </Typography>
      <TextField
        fullWidth
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
