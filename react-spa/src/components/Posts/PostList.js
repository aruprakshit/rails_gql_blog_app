import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  LinearProgress,
  ButtonGroup,
  Button,
} from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { lightBlue, green, red } from '@material-ui/core/colors';

import { useSession } from '../../hooks';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(1.5),
    color: theme.palette.text.secondary,
    '& .MuiButtonGroup-root': {
      marginLeft: 'auto',
    },
    '& .MuiButton-text:first-child': {
      color: lightBlue[600],
    },
    '& .MuiButton-text:nth-child(2)': {
      color: green[600],
    },
    '& .MuiButton-text:last-child': {
      color: red[600],
    },
  },
  ButtonGroupRoot: {
    display: 'flex',
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
  console.log('LOADING', loading);

  return (
    <Grid container item xs={12} spacing={3} className={classes.root}>
      <Loading loading={loading} />
      {!loading &&
        data.allPosts.map(post => <PostItem key={post.id} {...post} />)}
    </Grid>
  );
}

function PostItem({ body }) {
  const classes = useStyles();
  return (
    <Grid item xs={10}>
      <Paper elevation={5} className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {body}
          </Grid>
          <Grid item xs={12}>
            <div className={classes.ButtonGroupRoot}>
              <ButtonGroup variant='text' aria-label='text button group'>
                <Button>Show</Button>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </ButtonGroup>
            </div>
          </Grid>
        </Grid>
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
