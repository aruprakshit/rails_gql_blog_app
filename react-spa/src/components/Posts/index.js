import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import Header from '../Header';
import PostList from './PostList';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Posts() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid spacing={3} container>
        <Header />
        <PostList />
      </Grid>
    </div>
  );
}
