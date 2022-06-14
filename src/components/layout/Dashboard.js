import { Box, CssBaseline } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db, logout } from '../../firebase';
import { DrawerHeader } from '../../shared/ui-themes';
import './Dashboard.scss';
import AddNote from './notes/AddNote';
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
        overflowX: 'hidden',
      }}
    >
      <CssBaseline />
      <DrawerHeader />
      <AddNote />
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
