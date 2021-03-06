import { useTheme } from '@emotion/react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Masonry } from '@mui/lab';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Fab,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { useDataLayerValue } from '../../context-api/Datalayer';
import { actionTypes } from '../../context-api/reducer';
import { deleteMultiple } from '../../firebase';
import { DrawerHeader } from '../../shared/ui-themes';
import AlertDialog from '../UI/AlertDialog';
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
  const [edit, setEdit] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [id, setId] = useState('');
  const [prompt, setPrompt] = useState(false);
  const [{ isLoading }, dispatch] = useDataLayerValue();

  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

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
  };

  const setLoader = (isLoading) => {
    dispatch({
      type: actionTypes.SET_LOADER,
      isLoading: isLoading,
    });
  };

  const setSnackBar = (isError, message) => {
    dispatch({
      type: actionTypes.SET_SNACKBAR,
      snackbar: {
        isOpen: true,
        isError: isError,
        message: message,
      },
    });
  };

  const deleteAll = async () => {
    setLoader(true);
    const ids = props.notes.map((n) => n.id);
    try {
      await deleteMultiple(ids, props.uid);
      setSnackBar(false, 'All notes deleted.');
    } catch (err) {
      console.log(err);
      setSnackBar(true, 'Deleting notes failed.');
    }
    setLoader(false);
    props.getTrashed();
  };

  const openDialog = () => {
    setPrompt(true);
  };

  const closeDialog = () => {
    setPrompt(false);
  };

  const agreeDelete = () => {
    deleteAll();
    setPrompt(false);
  };

  const noteCards =
    props.notes.length !== 0 &&
    props.notes.map((note) => (
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
    ));

  return (
    <>
      <AlertDialog
        open={prompt}
        agree={agreeDelete}
        close={closeDialog}
        isSingle={false}
      />
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          overflowX: 'hidden',
        }}
      >
        <DrawerHeader />
        {props.showAddNote && (
          <AddNote
            edit={edit}
            isUpdate={isUpdate}
            title={title}
            note={note}
            id={id}
            uid={props.uid}
            onAdd={handleAdd}
            handleEdit={handleEdit}
            closeEdit={closeEdit}
          />
        )}

        {props.showDeleteAll && props.notes.length !== 0 && (
          <Tooltip title="Delete All">
            <Fab
              aria-label="delete-all"
              onClick={openDialog}
              sx={{ position: 'fixed', right: 15, bottom: 15 }}
              disabled={isLoading}
            >
              <RemoveCircleOutlineIcon />
            </Fab>
          </Tooltip>
        )}

        {props.notes.length === 0 && (
          <Card
            variant="outlined"
            sx={{
              maxWidth: 400,
              minWidth: 200,
              margin: '0 auto',
              borderRadius: '20px',
            }}
          >
            <CardMedia
              component="img"
              height="200"
              sx={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '50%',
                objectFit: 'contain',
              }}
              image="images/no_data.svg"
              alt="no data"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                No Notes Found!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please add notes from Notes section
              </Typography>
            </CardContent>
          </Card>
        )}

        <Box
          sx={{
            ...(isPhone && {
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(auto,220px))',
              justifyContent: 'space-evenly',
              gridColumnGap: '10px',
            }),
          }}
        >
          {!isPhone && (
            <Masonry columns={{ sm: 2, md: 3, lg: 5 }} spacing={2}>
              {noteCards}
            </Masonry>
          )}
          {isPhone && noteCards}
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
