import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, Grid } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import CommentListItem from './CommentListItem';
import NewComment from './NewComment';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '70%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const CREATE_COMMENT = gql`
  mutation($body: String!, $postId: ID!) {
    createComment(body: $body, postId: $postId) {
      errors
      comment {
        body
        id
        owner {
          email
        }
      }
    }
  }
`;

export default function Comments({ postId, comments }) {
  const classes = useStyles();
  const [createComment, { data, loading, error }] = useMutation(CREATE_COMMENT);

  const saveComment = body => {
    createComment({ variables: { body, postId } });
  };

  const newCommentProps = {
    data,
    loading,
    error,
    saveComment,
  };

  return (
    <React.Fragment>
      <Grid item xs={1}></Grid>
      <Grid item xs={11}>
        <NewComment {...newCommentProps} />
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={11}>
        <List className={classes.root}>
          {comments.map(comment => (
            <CommentListItem {...comment} key={comment.id} />
          ))}
        </List>
      </Grid>
    </React.Fragment>
  );
}
