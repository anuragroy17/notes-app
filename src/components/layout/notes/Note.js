import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import React, { useState } from 'react';
import { Archive, Delete, Edit } from '@mui/icons-material';

const Note = () => {
  const [show, setShow] = useState(false);

  return (
    <Card
      variant="outlined"
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
      sx={{ maxWidth: 200, borderRadius: '20px', marginBottom: '10px' }}
    >
      <CardHeader
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent sx={{ paddingBottom: '3px' }}>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like. This impressive paella is a perfect party dish
          and a fun meal to cook together with your guests. Add 1 cup of frozen
          peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: 'flex', justifyContent: 'right', paddingTop: 0 }}
      >
        <IconButton
          aria-label="delete"
          sx={{ visibility: show ? 'visible' : 'hidden' }}
        >
          <Delete />
        </IconButton>
        <IconButton
          aria-label="delete"
          sx={{ visibility: show ? 'visible' : 'hidden' }}
        >
          <Archive />
        </IconButton>
        <IconButton
          aria-label="edit"
          sx={{ visibility: show ? 'visible' : 'hidden' }}
        >
          <Edit />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Note;
