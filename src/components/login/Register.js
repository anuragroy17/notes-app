import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from '../../firebase';
import {
  Typography,
  Alert,
  Box,
  TextField,
  Grid,
  Button,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginContainer from '../UI/LoginContainer';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    if (!name) return setError('Please enter name');
    if (password !== passwordConfirm) return setError('Passwords do not match');
    try {
      setError('');
      await registerWithEmailAndPassword(name, email, password);
    } catch (err) {
      setError('Failed to create an account');
      console.log(err);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/notes');
  }, [user, loading, navigate]);

  return (
    <LoginContainer>
      <Avatar sx={{ m: 1, bgcolor: '#FBBC04' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      {error && (
        <Alert sx={{ mt: 1, width: 1, padding: '2px 5px' }} severity="error">
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={register} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          size="small"
          id="name"
          label="Name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
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
        <TextField
          margin="normal"
          required
          fullWidth
          size="small"
          name="password-confirm"
          label="Confirm Password"
          type="password"
          id="password-confirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          autoComplete="current-password"
        />
        <Button
          fullWidth
          variant="contained"
          disabled={loading}
          type="submit"
          sx={{ mt: 2, mb: 2 }}
          disableElevation
        >
          Sign Up
        </Button>

        <Grid container>
          <Grid item>
            Already have an account?&nbsp;
            <Link to="/">Login</Link> now.
          </Grid>
        </Grid>
      </Box>
    </LoginContainer>
  );
};

export default Register;
