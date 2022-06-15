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
import React, { useContext, useState } from 'react';
import MenuContext from '../../context/menu-context';
import { Drawer, DrawerHeader } from '../../shared/ui-themes';
import { pageArray } from '../../shared/utils';

const SideDrawer = (props) => {
  const ctx = useContext(MenuContext);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getNotes = (event, index) => {
    setSelectedIndex(index);
    props.getNotes();
  };

  const getArchived = (event, index) => {
    setSelectedIndex(index);
    props.getArchived();
  };

  const getTrashed = (event, index) => {
    setSelectedIndex(index);
    props.getTrashed();
  };

  return (
    <Drawer variant="permanent" open={ctx.open}>
      <DrawerHeader />
      <Divider />
      <List>
        <ListItem key="notes" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => getNotes(event, 0)}
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
            selected={selectedIndex === 1}
            onClick={(event) => getArchived(event, 1)}
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
            selected={selectedIndex === 2}
            onClick={(event) => getTrashed(event, 2)}
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
