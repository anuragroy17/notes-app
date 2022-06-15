import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Header from './Header';
import { Container, Box, CssBaseline } from '@mui/material';
import SideDrawer from './SideDrawer';
import MenuOpenContext from '../../context/menu-open-context';

const Layout = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MenuOpenContext.Provider
        value={{
          open: open,
          handleDrawerOpen: handleDrawerOpen,
          handleDrawerClose: handleDrawerClose,
        }}
      >
        <Header />
        <SideDrawer />
        <Dashboard />
      </MenuOpenContext.Provider>
    </Box>
  );
};

export default Layout;
