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
import { useMutation } from '@apollo/react-hooks';

import DisplayAlert from '../Utils/DisplayAlert';

const CREATE_POST = gql`
  mutation newPostCreate($body: String!) {
    createPost(body: $body) {
      errors
      post {
        id
        body
        owner {
          email
          id
          ownedPosts {
            id
          }
        }
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

export default function NewPost() {
  const classes = useStyles();
  const [body, setBody] = useState('');
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  const handleChange = event => {
    setBody(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    createPost({ variables: { body } });
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.root} square elevation={5}>
        <Typography variant='h4' align='center' gutterBottom>
          New Post
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
            {loading ? <CircularProgress /> : 'Create'}
          </Button>
        </form>
      </Paper>
      <DisplayAlert loading={loading} error={error} data={data?.createPost} />
    </Grid>
  );
}
