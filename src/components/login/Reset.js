import React, { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth, sendPasswordReset } from '../../firebase';
import {
  Typography,
  Alert,
  Box,
  TextField,
  Grid,
  Button,
  Avatar,
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import LoginContainer from '../UI/LoginContainer';
import { useDataLayerValue } from '../../context-api/Datalayer';
import { actionTypes } from '../../context-api/reducer';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [{ isLoading }, dispatch] = useDataLayerValue();
  const navigate = useNavigate();

  const reset = async () => {
    setLoader(true);
    try {
      setMessage('');
      setError('');
      await sendPasswordReset(email);
      setMessage(
        'Check your inbox for further instructions. If not found, check Spam folder'
      );
    } catch (err) {
      console.log(err);
      setError('Failed to reset password');
    }
    setLoader(false);
  };

  const setLoader = useCallback(
    (isLoading) => {
      dispatch({
        type: actionTypes.SET_LOADER,
        isLoading: isLoading,
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (loading) {
      setLoader(true);
      return;
    }

    setLoader(false);
    if (user) navigate('/dashboard');
  }, [user, loading, navigate, setLoader]);

  return (
    <LoginContainer>
      <Avatar sx={{ m: 1, bgcolor: '#FBBC04' }}>
        <LockResetIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Password Reset
      </Typography>
      {error && (
        <Alert sx={{ mt: 1, width: 1, padding: '2px 5px' }} severity="error">
          {error}
        </Alert>
      )}
      {message && (
        <Alert sx={{ mt: 1, width: 1, padding: '2px 5px' }} severity="success">
          {message}
        </Alert>
      )}

      <Box component="form" onSubmit={reset} noValidate sx={{ mt: 1 }}>
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
        <Button
          fullWidth
          variant="contained"
          disabled={loading}
          type="submit"
          sx={{ mt: 2, mb: 2 }}
          disableElevation
        >
          Reset Password
        </Button>

        <Grid container>
          <Grid item>
            Need an account? <Link to="/register">Register</Link> now.
          </Grid>
        </Grid>
      </Box>
    </LoginContainer>
  );
};

export default Reset;
