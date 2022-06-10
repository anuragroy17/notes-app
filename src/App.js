import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login.js';
import Register from './components/login/Register';
import Reset from './components/login/Reset';
import Dashboard from './components/layout/Dashboard';
import { Container, CssBaseline } from '@mui/material';

const App = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/reset" element={<Reset />}></Route>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
