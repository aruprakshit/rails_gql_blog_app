import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';

import DisplayAlert from '../Utils/DisplayAlert';

const FETCH_POST = gql`
  query fetchAPost($id: ID!) {
    post(id: $id) {
      id
      body
    }
  }
`;

const UPDATE_POST = gql`
  mutation updateAPost($body: String!, $postId: ID!) {
    updatePost(body: $body, postId: $postId) {
      errors
      post {
        body
        id
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    width: '70%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    '& .MuiTextField-root': {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    '& form': {
      padding: theme.spacing(1),
    },
    '& .MuiButton-root': {
      display: 'block',
      margin: 'auto',
    },
  },
}));

export default function EditPost({ match }) {
  const classes = useStyles();
  const [body, setBody] = useState('');
  const { data: persistedData, loading, error } = useQuery(FETCH_POST, {
    variables: { id: match.params.postId },
    onCompleted: ({ post }) => {
      setBody(post.body);
    },
  });
  const [updatePost, { data, loading: saving, error: saveError }] = useMutation(
    UPDATE_POST
  );

  const handleChange = event => {
    setBody(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    updatePost({ variables: { body, postId: match.params.postId } });
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.root} square elevation={5}>
        <Typography variant='h4' align='center' gutterBottom>
          Edit Post
        </Typography>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <TextField
            id='standard-multiline-flexible'
            label='What you have in mind?'
            multiline
            rows='4'
            value={body}
            variant='filled'
            onChange={handleChange}
          />
          <Button
            m={2}
            variant='contained'
            color='primary'
            size='large'
            type='submit'>
            {loading ? <CircularProgress /> : 'Update'}
          </Button>
        </form>
      </Paper>
      <DisplayAlert
        loading={loading}
        error={error}
        data={persistedData?.post}
      />
      <DisplayAlert
        loading={saving}
        error={saveError}
        data={data?.updatePost}
      />
    </Grid>
  );
}
