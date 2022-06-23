import { Box, Container } from '@mui/system';
import React from 'react';

const LoginContainer = (props) => {
  const classes = 'card ' + props.className;
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {props.children}
      </Box>
    </Container>
  );
};

export default LoginContainer;
