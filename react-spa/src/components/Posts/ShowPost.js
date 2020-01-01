import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import DisplayAlert from '../Utils/DisplayAlert';
import { QueryLoading } from './Loaders';
import RatePost from './RatePost';

const FETCH_POST = gql`
  query fetchAPost($id: ID!) {
    post(id: $id) {
      id
      body
      ratings {
        category
        id
        weight
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    width: '70%',
    margin: 'auto',
    padding: theme.spacing(1),
    '& .MuiTextField-root': {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
  },
  votesContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiBox-root': {
      marginLeft: 'auto',
      marginRight: 'auto',
      alignSelf: 'start',
    },
  },
}));

export default function ShowPost({ match }) {
  const classes = useStyles();
  const { postId } = match.params;

  const { data, loading, error } = useQuery(FETCH_POST, {
    variables: { id: postId },
  });

  if (loading && data === void 0) {
    return (
      <Grid item xs={12}>
        <QueryLoading loading={loading} />
      </Grid>
    );
  }

  const { body, ratings } = data.post;
  const ratingProps = { postId, ratings };

  return (
    <Grid item xs={12}>
      <Paper className={classes.root} square elevation={5}>
        <Grid container spacing={1}>
          <RatePost {...ratingProps} />
          <Grid item xs={11}>
            <Typography variant='body1' gutterBottom>
              {body}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <DisplayAlert loading={loading} error={error} data={data.post} />
    </Grid>
  );
}
