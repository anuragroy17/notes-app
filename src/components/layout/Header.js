import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import MenuOpenContext from '../../context/menu-open-context';
import { AppBar } from '../../shared/constants';

const Header = () => {
  const theme = useTheme();
  const ctx = useContext(MenuOpenContext);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={ctx.handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(ctx.open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={ctx.handleDrawerClose}
            edge="start"
            sx={{
              marginRight: 5,
              ...(!ctx.open && { display: 'none' }),
            }}
          >
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Notes
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
