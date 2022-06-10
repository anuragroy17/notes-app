import { AccountCircle, Logout } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import MenuOpenContext from '../../context/menu-open-context';
import { auth, db, logout } from '../../firebase';
import { AppBar } from '../../shared/ui-themes';
import { IgnoreDisabledListItem } from '../../shared/utils';

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const theme = useTheme();

  const ctx = useContext(MenuOpenContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setError('');

    try {
      await logout();
    } catch (err) {
      console.log(err);
      setError('Failed to log out');
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');

    const fetchUserName = async () => {
      setError('');

      try {
        const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.log(err);
        setError('An error occured while fetching user data');
      }
    };

    setName(user?.displayName);
    if (!user?.displayName) {
      fetchUserName();
    }
  }, [user, loading, navigate]);

  return (
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
            marginRight: 2,
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
            marginRight: 2,
            ...(!ctx.open && { display: 'none' }),
          }}
        >
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
        <DescriptionSharpIcon
          sx={{
            marginRight: 1,
          }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Notes
        </Typography>
        {auth && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <IgnoreDisabledListItem onClick={handleClose} disabled>
                <AccountCircle sx={{ color: '#a3a3a3' }} />
                <Typography ml={0.5} noWrap sx={{ color: '#a3a3a3' }}>
                  {name}
                </Typography>
              </IgnoreDisabledListItem>
              <MenuItem
                onClick={handleLogout}
                disabled={loading}
                horizontalalignment="Right"
              >
                <Logout sx={{ color: '#a3a3a3' }} />
                <Typography ml={0.5} noWrap>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
