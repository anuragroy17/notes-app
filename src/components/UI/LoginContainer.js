import { Button, FormControlLabel, Tooltip } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import { useDataLayerValue } from '../../context-api/Datalayer';
import { actionTypes } from '../../context-api/reducer';
import { DarkModeSwitch } from '../../shared/ui-themes';

const LoginContainer = (props) => {
  const [{ isDark }, dispatch] = useDataLayerValue();

  const setTheme = () => {
    dispatch({
      type: actionTypes.SET_THEME,
      isDark: !isDark,
    });
  };

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
        <Tooltip title="Set Dark Mode">
          <DarkModeSwitch
            sx={{ marginTop: 3 }}
            checked={isDark}
            onChange={setTheme}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Tooltip>
      </Box>
    </Container>
  );
};

export default LoginContainer;
