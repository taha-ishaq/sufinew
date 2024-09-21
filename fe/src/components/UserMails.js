import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

const UserMails = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch emails on component mount
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('https://sufiyakhanum.vercel.app/userEmails');
        if (!response.ok) {
          throw new Error('Failed to fetch emails');
        }
        const data = await response.json();
        setEmails(data); // Assuming the data is an array of objects with _id and email fields
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>User Emails</Typography>
      {emails.length > 0 ? (
        <Box>
          {emails.map((emailObj) => (
            <Typography key={emailObj._id} variant="body1" sx={{ marginBottom: '10px' }}>
              {emailObj.email} {/* Extract and display the email field */}
            </Typography>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">No emails found.</Typography>
      )}
    </Box>
  );
};

export default UserMails;
