import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, LinearProgress, Box } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import { useSession } from '../../hooks';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: theme.spacing(10),
  },
}));

const FETCH_ALL_POSTS = gql`
  {
    allPosts {
      id
      body
      owner {
        username
      }
    }
  }
`;

export default function PostList() {
  const classes = useStyles();
  const { logOut } = useSession();
  const { loading, error, data } = useQuery(FETCH_ALL_POSTS);

  return (
    <Grid container item xs={12} spacing={3} className={classes.root}>
      <Loading loading={loading} />
      {!loading &&
        data.allPosts.map(post => <PostItem key={post.id} {...post} />)}
    </Grid>
  );
}

function PostItem({ body }) {
  return (
    <Grid item xs={10}>
      <Paper elevation={5}>
        <Box>{body}</Box>
      </Paper>
    </Grid>
  );
}

function Loading({ loading }) {
  if (!loading) return null;

  return (
    <Grid item xs={10}>
      <LinearProgress variant='query' />
    </Grid>
  );
}
