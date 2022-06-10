import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss';
import { auth, db, logout } from '../../firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';
import {
  Typography,
  Alert,
  Box,
  Grid,
  Button,
  CssBaseline,
} from '@mui/material';
import { DrawerHeader } from '../../shared/ui-themes';
import { Notes } from '@mui/icons-material';
import Note from './notes/Note';

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
        flexGrow: 1,
        p: 3,
      }}
    >
      <CssBaseline />
      <DrawerHeader />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(auto,220px))',
          justifyContent: 'space-evenly',
          gridColumnGap: '10px',
        }}
      >
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
      </Box>
    </Box>
  );
};

export default Dashboard;
