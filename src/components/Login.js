import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Form, Button, Card, Alert } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const login = async () => {
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
    if (user) navigate('/dashboard');
  }, [user, loading, navigate]);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="password" className="mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" onClick={login}>
              Login
            </Button>
            <Button
              variant="dark"
              disabled={loading}
              className="w-100 mt-3"
              onClick={googleOAuth}
            >
              Login with Google
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/reset">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/register">Register</Link> now.
      </div>
    </>
  );
}

export default Login;
