import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  Card,
  CardActions,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addNote, auth, db } from '../../../firebase';

const AddNote = (props) => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState('');
  // const ref = useRef(null);

  const handleEdit = () => {
    if (edit) {
      return;
    }
    setEdit(true);
  };

  const handleNoteInput = (event) => {
    setNote(event.target.value);
  };

  const handleTitleInput = (event) => {
    setTitle(event.target.value);
  };

  const closeEdit = () => {
    setEdit(false);
    setTitle('');
    setNote('');
    setError('');
  };

  const addNoteToDB = async () => {
    try {
      await addNote(title, note, user?.uid);
    } catch (err) {
      console.log(err);
      setError('An error occured while fetching user data');
    }
    setTitle('');
    setNote('');
    setError('');
    setEdit(false);
  };

  const addEditNote = async (e) => {
    e.preventDefault();
    if (note.trim().length === 0 || title.trim().length === 0) {
      setError('Please fill data');
      return;
    }
    addNoteToDB();
    props.onAdd();
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 400,
        minWidth: 200,
        margin: '0 auto',
        borderRadius: '20px',
        marginBottom: '30px',
      }}
      onClick={handleEdit}
    >
      <Typography sx={{ padding: '20px', ...(edit && { display: 'none' }) }}>
        Add a Note ...
      </Typography>
      <Box
        sx={{
          padding: '20px',
          transition: 'display 2s',
          ...(!edit && { display: 'none' }),
        }}
      >
        <form onSubmit={addEditNote}>
          <TextField
            id="standard-basic"
            label="Title.."
            variant="standard"
            value={title}
            onChange={handleTitleInput}
            fullWidth
          />
          <TextField
            id="standard-multiline-flexible"
            label="Write Something.."
            multiline
            maxRows={4}
            fullWidth
            value={note}
            onChange={handleNoteInput}
            variant="standard"
            sx={{
              marginTop: '10px',
            }}
            autoFocus
          />
          <CardActions
            disableSpacing
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingRight: 0,
            }}
          >
            <IconButton
              variant="outlined"
              color="error"
              aria-label="add to favorites"
              onClick={closeEdit}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              variant="outlined"
              color="primary"
              aria-label="share"
              onClick={addEditNote}
            >
              <AddIcon />
            </IconButton>
          </CardActions>
        </form>
      </Box>
    </Card>
  );
};

export default AddNote;
