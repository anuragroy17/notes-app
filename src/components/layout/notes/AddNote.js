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
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addNote, auth, editNote } from '../../../firebase';

const AddNote = (props) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [isUpdate, setUpdate] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState('');

  const handleEdit = () => {
    props.handleEdit();
  };

  const handleNoteInput = (event) => {
    setNote(event.target.value);
  };

  const handleTitleInput = (event) => {
    setTitle(event.target.value);
  };

  const closeEdit = () => {
    setTitle('');
    setNote('');
    setError('');
    setUpdate(false);
    props.closeEdit();
  };

  const addNoteToDB = async () => {
    try {
      await addNote(title, note, user?.uid);
    } catch (err) {
      console.log(err);
      setError('An error occured while adding note');
    }
    setTitle('');
    setNote('');
    setError('');
    props.closeEdit();
    props.onAdd();
  };

  const updateNoteToDB = async () => {
    try {
      await editNote(title, note, props.uid, props.id);
    } catch (err) {
      console.log(err);
      setError('An error occured while updating note');
    }
    setTitle('');
    setNote('');
    setError('');
    setUpdate(false);
    props.closeEdit();
    props.onAdd();
  };

  const addEditNote = async (e) => {
    e.preventDefault();
    if (note.trim().length === 0 || title.trim().length === 0) {
      setError('Please fill data');
      return;
    }
    if (isUpdate) {
      updateNoteToDB();
      return;
    }
    addNoteToDB();
  };

  useEffect(() => {
    if (props.isUpdate) {
      setTitle(props.title);
      setNote(props.note);
      setUpdate(true);
    }
  }, [props.isUpdate, props.note, props.title]);

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
      <Typography
        sx={{ padding: '20px', ...(props.edit && { display: 'none' }) }}
      >
        Add a Note ...
      </Typography>
      <Box
        sx={{
          padding: '20px',
          transition: 'display 2s',
          ...(!props.edit && { display: 'none' }),
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
            inputRef={input && input.focus()}
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
              type="submit"
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
