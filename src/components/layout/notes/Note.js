import { Archive, Delete, Edit } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { setLocation, deleteNote } from '../../../firebase';
import { useDataLayerValue } from '../../../context-api/Datalayer';
import { actionTypes } from '../../../context-api/reducer';
import AlertDialog from '../../UI/AlertDialog';
import { useTheme } from '@emotion/react';

const Note = (props) => {
  const [prompt, setPrompt] = useState(false);
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
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

  const openDialog = () => {
    setPrompt(true);
  };

  const closeDialog = () => {
    setPrompt(false);
  };

  const agreeDelete = () => {
    deleteNoteFromFS();
    setPrompt(false);
  };

  return (
    <>
      <AlertDialog
        open={prompt}
        agree={agreeDelete}
        close={closeDialog}
        isSingle={true}
      />
      <Card
        variant="outlined"
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
          subheader={
            <Typography
              sx={{
                fontSize: '11px',
                fontStyle: 'oblique',
              }}
            >
              {props.createdDate}
            </Typography>
          }
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
                className={isPhone ? 'show-button' : 'hidden-button'}
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
                className={isPhone ? 'show-button' : 'hidden-button'}
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
                className={isPhone ? 'show-button' : 'hidden-button'}
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
                className={isPhone ? 'show-button' : 'hidden-button'}
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
                className={isPhone ? 'show-button' : 'hidden-button'}
                onClick={openDialog}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          )}
          {(props.isNote || props.isArchived) && (
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                className={isPhone ? 'show-button' : 'hidden-button'}
                onClick={() => setLocationinFS('isTrashed', true)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default Note;
