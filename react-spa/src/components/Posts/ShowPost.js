import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Box, Icon } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { green, red } from '@material-ui/core/colors';

import DisplayAlert from '../Utils/DisplayAlert';
import { QueryLoading } from './Loaders';

const FETCH_POST = gql`
  query fetchAPost($id: ID!) {
    post(id: $id) {
      id
      body
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

  const { data, loading, error } = useQuery(FETCH_POST, {
    variables: { id: match.params.postId },
  });

  if (loading && data === void 0) {
    return (
      <Grid item xs={12}>
        <QueryLoading loading={loading} />
      </Grid>
    );
  }

  const { body } = data.post;

  return (
    <Grid item xs={12}>
      <Paper className={classes.root} square elevation={5}>
        <Grid container spacing={1}>
          <Grid item xs={1} className={classes.votesContainer}>
            <Box>
              <Icon style={{ color: green[600], fontSize: 25 }}>
                arrow_upward
              </Icon>
            </Box>
            <Box>
              <Icon style={{ color: red[600], fontSize: 25 }}>
                arrow_downward
              </Icon>
            </Box>
          </Grid>
          <Grid item xs={11}>
            <Typography variant='body1' gutterBottom>
              {body}
              {body}
              {body}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <DisplayAlert loading={loading} error={error} data={data.post} />
    </Grid>
  );
}
