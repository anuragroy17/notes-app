import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  Typography,
  Alert,
  Box,
  TextField,
  Grid,
  Button,
  Avatar,
  Container,
} from '@mui/material';
import { Google } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import LoginContainer from '../UI/LoginContainer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await logInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err);
      setError('Failed to log in');
    }
  };

  const googleOAuth = async () => {
    try {
      setError('');
      await signInWithGoogle();
    } catch (err) {
      console.log(err);
      setError('Error in google sign in!');
    }
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/notes');
  }, [user, loading, navigate]);

  return (
    <LoginContainer>
      <Avatar sx={{ m: 1, bgcolor: '#FBBC04' }}>
        <LoginIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Log In
      </Typography>
      {error && (
        <Alert sx={{ mt: 1, width: 1, padding: '2px 5px' }} severity="error">
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          size="small"
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          size="small"
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{ mt: 2, mb: 2 }}
          disableElevation
        >
          Sign In
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Google />}
          disabled={loading}
          onClick={googleOAuth}
          sx={{ mb: 2 }}
          disableElevation
        >
          Login with Google
        </Button>

        <Grid container>
          <Grid item xs>
            <Link to="/reset" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </Grid>
        </Grid>
      </Box>
    </LoginContainer>
  );
};

export default Login;
