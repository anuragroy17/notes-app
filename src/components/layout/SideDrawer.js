import {
  NoteAddRounded,
  ArchiveRounded,
  DeleteForeverRounded,
} from '@mui/icons-material/';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { useContext } from 'react';
import MenuOpenContext from '../../context/menu-open-context';
import { Drawer, DrawerHeader } from '../../shared/ui-themes';

const SideDrawer = () => {
  const ctx = useContext(MenuOpenContext);

  return (
    <Drawer variant="permanent" open={ctx.open}>
      <DrawerHeader />
      <Divider />
      <List>
        <ListItem key="notes" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: ctx.open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: ctx.open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <NoteAddRounded />
            </ListItemIcon>
            <ListItemText primary="Notes" sx={{ opacity: ctx.open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem key="archived" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: ctx.open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: ctx.open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <ArchiveRounded />
            </ListItemIcon>
            <ListItemText
              primary="Archive"
              sx={{ opacity: ctx.open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key="trashed" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: ctx.open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: ctx.open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <DeleteForeverRounded />
            </ListItemIcon>
            <ListItemText primary="Trash" sx={{ opacity: ctx.open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideDrawer;
