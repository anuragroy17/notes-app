import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss';
import { auth, db, logout } from '../../firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { Typography, Alert, Box, Grid, Button } from '@mui/material';

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError('');

    try {
      await logout();
    } catch (err) {
      console.log(err);
      setError('Failed to log out');
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');

    const fetchUserName = async () => {
      setError('');

      try {
        const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.log(err);
        setError('An error occured while fetching user data');
      }
    };

    setName(user?.displayName);
    if (!user?.displayName) {
      fetchUserName();
    }
  }, [user, loading, navigate]);

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Profile
      </Typography>
      {error && (
        <Alert sx={{ mt: 1, width: 1, padding: '2px 5px' }} severity="error">
          {error}
        </Alert>
      )}
      <Grid container>
        <Grid item>
          <strong>Name:</strong> {name}
        </Grid>
      </Grid>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <Button
          fullWidth
          variant="contained"
          disabled={loading}
          onClick={handleLogout}
          sx={{ mt: 2, mb: 2 }}
          disableElevation
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
