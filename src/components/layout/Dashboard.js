import { Box, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { DrawerHeader } from '../../shared/ui-themes';
import './Dashboard.scss';
import AddNote from './notes/AddNote';
import Note from './notes/Note';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Dashboard = (props) => {
  const handleAdd = () => {
    props.onAdd();
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        overflowX: 'hidden',
      }}
    >
      <CssBaseline />
      <DrawerHeader />
      {props.showAddNote && <AddNote onAdd={handleAdd} />}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(auto,220px))',
          justifyContent: 'space-evenly',
          gridColumnGap: '10px',
        }}
      >
        {props.notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            uid={props.uid}
            title={note.title}
            note={note.note}
            isNote={note.isNote}
            isArchived={note.isArchived}
            isTrashed={note.isTrashed}
            createdDate={`${
              months[note.date.getMonth()]
            } ${note.date.getDate()}, ${note.date.getFullYear()}`}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
