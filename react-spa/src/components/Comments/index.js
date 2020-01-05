import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import CommentListItem from './CommentListItem';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '70%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Comments({ postId, comments }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {comments.map(comment => (
        <CommentListItem {...comment} key={comment.id} />
      ))}
    </List>
  );
}
