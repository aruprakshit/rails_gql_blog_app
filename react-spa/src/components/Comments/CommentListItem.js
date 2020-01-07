import React from 'react';
import { ListItemText, Box, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import RateComment from './RateComment';

const useStyles = makeStyles(theme => ({
  inline: {
    display: 'inline',
  },
}));

export default function CommentListItem({ id, body, owner, ratings }) {
  const classes = useStyles();

  return (
    <ListItem alignItems='flex-start' divider>
      <ListItemText
        secondary={
          <Box>
            <Typography
              component='span'
              variant='body2'
              className={classes.inline}
              color='textPrimary'>
              {owner.username}
            </Typography>
            {` — ${body}`}
            <RateComment commentId={id} ratings={ratings} />
          </Box>
        }
      />
    </ListItem>
  );
}
