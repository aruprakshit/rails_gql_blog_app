import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header';
import PostList from './PostList';
import NewPost from './NewPost';
import EditPost from './EditPost';
import ShowPost from './ShowPost';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Posts({ match }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid spacing={3} container>
        <Header />
        <Switch>
          <Route path={`${match.path}/new`} component={NewPost} />
          <Route path={`${match.path}/:postId/edit`} component={EditPost} />
          <Route path={`${match.path}/:postId`} component={ShowPost} />
          <Route exact path={`${match.path}`} component={PostList} />
        </Switch>
      </Grid>
    </div>
  );
}
