import React, { useCallback, useEffect, useState } from 'react';
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
import { useDataLayerValue } from '../../context-api/Datalayer';
import { actionTypes } from '../../context-api/reducer';

const Register = () => {
  const initialValues = {
    email: '',
    password: '',
    name: '',
    passwordConfirm: '',
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [error, setError] = useState('');
  const [user, loading] = useAuthState(auth);
  const [{ isLoading }, dispatch] = useDataLayerValue();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name || values.name.trim() === '') {
      errors.name = 'Name is required!';
    }

    if (!values.email || values.email.trim() === '') {
      errors.email = 'Email is required!';
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }

    if (!values.password || values.password.trim() === '') {
      errors.password = 'Password is required';
    } else if (values.password.length < 4) {
      errors.password = 'Password must be more than 4 characters';
    } else if (values.password.length > 10) {
      errors.password = 'Password cannot exceed more than 10 characters';
    }

    if (!values.passwordConfirm) {
      errors.passwordConfirm = 'Confirm Password is required';
    } else if (values.password !== values.passwordConfirm) {
      errors.passwordConfirm = 'Passwords do not match';
    }

    return errors;
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
    const register = async () => {
      setLoader(true);
      try {
        setError('');
        await registerWithEmailAndPassword(
          formValues.name,
          formValues.email,
          formValues.password
        );
      } catch (err) {
        setError('Failed to create an account');
        console.log(err);
      }
      setFormErrors({});
      setIsSubmit(false);
      setLoader(false);
    };

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      register();
    }
  }, [
    formErrors,
    formValues.email,
    formValues.name,
    formValues.password,
    isSubmit,
    setLoader,
  ]);

  useEffect(() => {
    if (loading) {
      setLoader(true);
      return;
    }
    setLoader(false);
    if (user) navigate('/notes');
  }, [user, loading, navigate, setLoader]);

  return (
    <LoginContainer>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Scribbly - Sign Up
      </Typography>
      {error && (
        <Alert sx={{ mt: 1, width: 1, padding: '2px 5px' }} severity="error">
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
        <TextField
          error={formErrors.name}
          helperText={formErrors.name}
          margin="normal"
          required
          fullWidth
          size="small"
          id="name"
          label="Name"
          name="name"
          type="text"
          value={formValues.name}
          onChange={handleChange}
          autoFocus
        />
        <TextField
          error={formErrors.email}
          helperText={formErrors.email}
          margin="normal"
          required
          fullWidth
          size="small"
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
        />
        <TextField
          error={formErrors.password}
          helperText={formErrors.password}
          margin="normal"
          required
          fullWidth
          size="small"
          name="password"
          label="Password"
          type="password"
          id="password"
          value={formValues.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <TextField
          error={formErrors.passwordConfirm}
          helperText={formErrors.passwordConfirm}
          margin="normal"
          required
          fullWidth
          size="small"
          name="passwordConfirm"
          label="Confirm Password"
          type="password"
          id="password-confirm"
          value={formValues.passwordConfirm}
          onChange={handleChange}
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
