import { Archive, Delete, Edit } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { setLocation, deleteNote } from '../../../firebase';
import { useDataLayerValue } from '../../../context-api/Datalayer';
import { actionTypes } from '../../../context-api/reducer';

const Note = (props) => {
  const [show, setShow] = useState(false);
  const [{ isLoading }, dispatch] = useDataLayerValue();

  const setLoader = (isLoading) => {
    dispatch({
      type: actionTypes.SET_LOADER,
      isLoading: isLoading,
    });
  };

  const setLocationinFS = async (locationField, flag) => {
    const locationObj = {
      isNote: false,
      isArchived: false,
      isTrashed: false,
      [locationField]: flag,
    };
    setLoader(true);
    await setLocation(locationObj, props.uid, props.id);
    setLoader(false);
    props.onClick();
  };

  const deleteNoteFromFS = async () => {
    setLoader(true);
    await deleteNote(props.uid, props.id);
    setLoader(false);
    props.onClick();
  };

  const editNote = () => {
    props.editNote(props.title, props.note, props.id, props.uid);
  };

  return (
    <Card
      variant="outlined"
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
      sx={{ width: 200, borderRadius: '20px', marginBottom: '10px' }}
    >
      <CardHeader
        title={
          <Tooltip title={props.title}>
            <Typography noWrap gutterBottom variant="h6" component="h4">
              {props.title}
            </Typography>
          </Tooltip>
        }
        subheader={props.createdDate}
        sx={{ display: 'block', overflow: 'hidden' }}
      />
      <CardContent sx={{ paddingBottom: '3px' }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ overflowWrap: 'break-word' }}
        >
          {props.note}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          display: 'flex',
          justifyContent: 'right',
          paddingTop: 0,
        }}
      >
        {props.isNote && (
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              sx={{ visibility: show ? 'visible' : 'hidden' }}
              onClick={editNote}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        )}

        {(props.isNote || props.isArchived) && (
          <Tooltip title="Archive">
            <IconButton
              aria-label="archive"
              sx={{ visibility: show ? 'visible' : 'hidden' }}
              onClick={() => setLocationinFS('isArchived', true)}
            >
              <Archive />
            </IconButton>
          </Tooltip>
        )}
        {props.isArchived && (
          <Tooltip title="Unarchive">
            <IconButton
              aria-label="archive"
              sx={{ visibility: show ? 'visible' : 'hidden' }}
              onClick={() => setLocationinFS('isNote', true)}
            >
              <UnarchiveIcon />
            </IconButton>
          </Tooltip>
        )}
        {props.isTrashed && (
          <Tooltip title="Restore">
            <IconButton
              aria-label="delete"
              sx={{ visibility: show ? 'visible' : 'hidden' }}
              onClick={() => setLocationinFS('isNote', true)}
            >
              <RestoreFromTrashIcon />
            </IconButton>
          </Tooltip>
        )}
        {props.isTrashed && (
          <Tooltip title="Delete Forever">
            <IconButton
              aria-label="delete"
              sx={{ visibility: show ? 'visible' : 'hidden' }}
              onClick={deleteNoteFromFS}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        )}
        {(props.isNote || props.isArchived) && (
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              sx={{ visibility: show ? 'visible' : 'hidden' }}
              onClick={() => setLocationinFS('isTrashed', true)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
};

export default Note;
