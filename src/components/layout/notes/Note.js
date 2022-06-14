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

const Note = (props) => {
  const [show, setShow] = useState(false);

  const setLocationinFS = async (locationField, flag) => {
    const locationObj = {
      isNote: false,
      isArchived: false,
      isTrashed: false,
      [locationField]: flag,
    };
    await setLocation(locationObj, props.uid, props.id);
    props.onClick();
  };

  const deleteNoteFromFS = async () => {
    await deleteNote(props.uid, props.id);
    props.onClick();
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
          <IconButton
            aria-label="edit"
            sx={{ visibility: show ? 'visible' : 'hidden' }}
          >
            <Edit />
          </IconButton>
        )}

        {(props.isNote || props.isArchived) && (
          <IconButton
            aria-label="archive"
            sx={{ visibility: show ? 'visible' : 'hidden' }}
            onClick={() => setLocationinFS('isArchived', true)}
          >
            <Archive />
          </IconButton>
        )}
        {props.isArchived && (
          <IconButton
            aria-label="archive"
            sx={{ visibility: show ? 'visible' : 'hidden' }}
            onClick={() => setLocationinFS('isNote', true)}
          >
            <UnarchiveIcon />
          </IconButton>
        )}
        {props.isTrashed && (
          <IconButton
            aria-label="delete"
            sx={{ visibility: show ? 'visible' : 'hidden' }}
            onClick={() => setLocationinFS('isNote', true)}
          >
            <RestoreFromTrashIcon />
          </IconButton>
        )}
        {props.isTrashed && (
          <IconButton
            aria-label="delete"
            sx={{ visibility: show ? 'visible' : 'hidden' }}
            onClick={deleteNoteFromFS}
          >
            <DeleteForeverIcon />
          </IconButton>
        )}
        {(props.isNote || props.isArchived) && (
          <IconButton
            aria-label="delete"
            sx={{ visibility: show ? 'visible' : 'hidden' }}
            onClick={() => setLocationinFS('isTrashed', true)}
          >
            <Delete />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default Note;
