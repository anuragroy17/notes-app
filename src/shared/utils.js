import { ListItem } from '@mui/material';
import React from 'react';

export const pageArray = ['Notes', 'Archive', 'Trash'];

export const IgnoreDisabledListItem = React.forwardRef(
  function IgnoreDisabledListItem({ disabled, ...other }, ref) {
    return <ListItem {...other} ref={ref} />;
  }
);
