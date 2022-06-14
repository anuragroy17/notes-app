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
import MenuContext from '../../context/menu-context';
import { Drawer, DrawerHeader } from '../../shared/ui-themes';
import { pageArray } from '../../shared/utils';

const SideDrawer = (props) => {
  const ctx = useContext(MenuContext);

  const getNotes = () => {
    props.getNotes();
  };

  const getArchived = () => {
    props.getArchived();
  };

  const getTrashed = () => {
    props.getTrashed();
  };

  return (
    <Drawer variant="permanent" open={ctx.open}>
      <DrawerHeader />
      <Divider />
      <List>
        <ListItem key="notes" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={getNotes}
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
            <ListItemText
              primary={pageArray[0]}
              sx={{ opacity: ctx.open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem key="archived" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={getArchived}
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
              primary={pageArray[1]}
              sx={{ opacity: ctx.open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key="trashed" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={getTrashed}
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
            <ListItemText
              primary={pageArray[2]}
              sx={{ opacity: ctx.open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideDrawer;
