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
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
        non enim praesent elementum facilisis leo vel. Risus at ultrices mi
        tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
        tellus. Convallis convallis tellus id interdum velit laoreet id donec
        ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
        suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
        quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
        proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
        tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
        varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
        Lorem donec massa sapien faucibus et molestie ac.
      </Typography>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
        ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
        integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
        lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
        Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
        accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
        Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
        senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
        Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
        maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
        aliquam ultrices sagittis orci a.
      </Typography>
      {/* <Typography component="h1" variant="h5">
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
      </Box> */}
    </Box>
  );
};

export default Dashboard;
