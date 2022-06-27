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
import { useDataLayerValue } from '../../../context-api/Datalayer';
import { actionTypes } from '../../../context-api/reducer';
import { addNote, editNote } from '../../../firebase';

const AddNote = (props) => {
  const initialValues = {
    title: '',
    note: '',
  };
  const [oldNote, setOldNote] = useState('');
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const [isUpdate, setUpdate] = useState(false);
  const [{ isLoading, snackbar }, dispatch] = useDataLayerValue();

  const handleEdit = () => {
    props.handleEdit();
  };

  const handleChange = (e) => {
    console.log('hghgh');
    const { name, value } = e.target;
    setFormValues((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.title || values.title.trim() === '') {
      errors.title = 'Title is required!';
    } else if (values.title.length < 4) {
      errors.title = 'Title must be more than 4 characters';
    } else if (values.title.length > 25) {
      errors.title = 'Title cannot exceed more than 25 characters';
    }

    if (!values.note || values.note.trim() === '') {
      errors.note = 'Note is required';
    } else if (values.note.length < 4) {
      errors.note = 'Note must be more than 4 characters';
    }

    if (isUpdate) {
      if (oldNote === values.note) {
        errors.note = 'Please update note';
      }
    }

    return errors;
  };

  const closeEdit = () => {
    setFormValues(initialValues);
    setFormErrors({});
    setUpdate(false);
    props.closeEdit();
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

  const addNoteToDB = async () => {
    setLoader(true);
    try {
      await addNote(formValues.title, formValues.note, props.uid);
      setSnackBar(false, 'Note saved successfully.');
    } catch (err) {
      console.log(err);
      setSnackBar(true, 'An error occured while adding note.');
    }
    setLoader(false);
    setFormValues(initialValues);
    props.closeEdit();
    props.onAdd();
  };

  const updateNoteToDB = async () => {
    setLoader(true);
    try {
      await editNote(formValues.title, formValues.note, props.uid, props.id);
      setSnackBar(false, 'Note updated successfully.');
    } catch (err) {
      console.log(err);
      setSnackBar(true, 'An error occured while updating note.');
    }
    setLoader(false);
    setFormValues(initialValues);
    setUpdate(false);
    props.closeEdit();
    props.onAdd();
  };

  const addEditNote = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    const isSubmit = Object.keys(errors).length === 0;
    setFormErrors(errors);

    console.log(isSubmit);
    if (isSubmit) {
      if (isUpdate) {
        updateNoteToDB();
        return;
      }
      addNoteToDB();
    }
  };

  useEffect(() => {
    if (props.isUpdate) {
      setFormValues({ title: props.title, note: props.note });
      setOldNote(props.note);
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
            error={formErrors.title && formErrors.title !== ''}
            helperText={formErrors.title}
            id="standard-basic"
            label="Title.."
            variant="standard"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            error={formErrors.note && formErrors.note !== ''}
            helperText={formErrors.note}
            id="standard-multiline-flexible"
            label="Write a note.."
            multiline
            maxRows={4}
            fullWidth
            name="note"
            value={formValues.note}
            onChange={handleChange}
            variant="standard"
            sx={{
              marginTop: '20px',
            }}
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
