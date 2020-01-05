import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, CircularProgress, Button } from '@material-ui/core';

import DisplayAlert from '../Utils/DisplayAlert';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '70% !important',
    },
    '& .MuiButton-root': {
      display: 'block',
      marginLeft: 8,
    },
  },
}));

export default function NewComment({ loading, error, saveComment, data }) {
  const classes = useStyles();
  const [body, setBody] = React.useState('');

  const handleChange = event => {
    setBody(event.target.value);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    saveComment(body);
    setBody('');
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete='off'
      onSubmit={onFormSubmit}>
      <TextField
        id='outlined-multiline-flexible'
        label='Add Comment'
        multiline
        rowsMax='6'
        value={body}
        onChange={handleChange}
        variant='outlined'
      />
      <Button
        m={2}
        variant='contained'
        color='primary'
        size='large'
        type='submit'>
        {loading ? <CircularProgress /> : 'Create'}
      </Button>
      <DisplayAlert
        loading={loading}
        error={error}
        data={data?.createComment}
      />
    </form>
  );
}
