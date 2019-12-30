import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Box,
  LinearProgress,
  ButtonGroup,
  Button,
  Icon,
} from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { lightBlue, green, red } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

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

export default function PostList({ match, history }) {
  const classes = useStyles();
  const { loading, data } = useQuery(FETCH_ALL_POSTS);

  return (
    <Grid container item xs={12} spacing={3} className={classes.root}>
      <Loading loading={loading} />
      <Grid item xs={10}>
        <Box position='fixed' top='15%' right={30} zIndex='modal'>
          <Link to={`${match.path}/new`}>
            <Icon style={{ color: green[500], fontSize: 60 }}>add_circle</Icon>
          </Link>
        </Box>
      </Grid>
      {!loading &&
        data.allPosts.map(post => (
          <PostItem key={post.id} {...post} match={match} history={history} />
        ))}
    </Grid>
  );
}

function PostItem({ body, id, match, history }) {
  const classes = useStyles();
  const redirctTo = actionName => e => {
    e.preventDefault();

    switch (actionName) {
      case 'show':
        return history.push(`${match.path}/${id}`);
      default:
        break;
    }
  };
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
                <Button onClick={redirctTo('show')}>Show</Button>
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
