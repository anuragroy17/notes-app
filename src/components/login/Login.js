import { Google } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../../context-api/Datalayer';
import { actionTypes } from '../../context-api/reducer';
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from '../../firebase';
import LoginContainer from '../UI/LoginContainer';

const Login = () => {
  const initialValues = {
    email: '',
    password: '',
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

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

    return errors;
  };

  const googleOAuth = async () => {
    setFormErrors({});
    setLoader(true);
    setIsSubmit(false);
    try {
      setError('');
      await signInWithGoogle();
    } catch (err) {
      console.log(err);
      setError('Error in google sign in!');
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
    const login = async () => {
      setLoader(true);
      try {
        setError('');
        await logInWithEmailAndPassword(formValues.email, formValues.password);
      } catch (err) {
        console.log(err);
        setError('Failed to log in');
      }
      setFormErrors({});
      setIsSubmit(false);
      setLoader(false);
    };

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      login();
    }
  }, [formErrors, formValues.email, formValues.password, isSubmit, setLoader]);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      setLoader(true);
      return;
    }
    setLoader(false);
    if (user) navigate('/notes');
  }, [user, loading, navigate, setLoader]);

  return (
    <LoginContainer>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LoginIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Scribbly - Log In
      </Typography>
      {error && (
        <Alert sx={{ mt: 1, width: 1, padding: '2px 5px' }} severity="error">
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
        <TextField
          error={formErrors.email && formErrors.email !== ''}
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
          autoFocus
        />
        <TextField
          error={formErrors.password && formErrors.password !== ''}
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
