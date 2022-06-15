import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login.js';
import Register from './components/login/Register';
import Reset from './components/login/Reset';
import Layout from './components/layout/Layout';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './shared/ui-themes.js';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/reset" element={<Reset />}></Route>
          <Route exact path="/notes" element={<Layout />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
