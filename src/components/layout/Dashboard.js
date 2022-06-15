import { Box, CssBaseline, Fab, Tooltip } from '@mui/material';
import { useState } from 'react';
import { DrawerHeader } from '../../shared/ui-themes';
import './Dashboard.scss';
import AddNote from './notes/AddNote';
import Note from './notes/Note';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { auth, deleteMultiple } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

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
  const [edit, setEdit] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [id, setId] = useState('');
  const [uid, setUid] = useState('');

  const handleEdit = () => {
    if (edit) {
      return;
    }
    setEdit(true);
  };

  const closeEdit = () => {
    setEdit(false);
    setUpdate(false);
    setTitle('');
    setNote('');
    setId('');
    setUid('');
  };

  const handleAdd = () => {
    props.onAdd();
  };

  const handleOnCLick = () => {
    props.onClickLocation();
  };

  const editNote = (title, note, id, uid) => {
    setEdit(true);
    setUpdate(true);
    setTitle(title);
    setNote(note);
    setId(id);
    setUid(uid);
  };

  const deleteAll = async () => {
    const ids = props.notes.map((n) => n.id);
    await deleteMultiple(ids, props.uid);
    props.getTrashed();
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
      {props.showAddNote && (
        <AddNote
          edit={edit}
          isUpdate={isUpdate}
          title={title}
          note={note}
          id={id}
          uid={uid}
          onAdd={handleAdd}
          handleEdit={handleEdit}
          closeEdit={closeEdit}
        />
      )}

      {props.showDeleteAll && props.notes.length !== 0 && (
        <Tooltip title="Delete All">
          <Fab
            aria-label="delete-all"
            onClick={deleteAll}
            sx={{ position: 'fixed', right: 15, bottom: 15 }}
          >
            <RemoveCircleOutlineIcon />
          </Fab>
        </Tooltip>
      )}
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
            onClick={handleOnCLick}
            editNote={editNote}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
