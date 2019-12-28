import React from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import DisplayAlert from './DisplayAlert';

const LOGIN_USER = gql`
  mutation signIn($usrOrEmail: String!, $password: String!) {
    logIn(usrOrEmail: $usrOrEmail, password: $password) {
      errors
      user {
        id
        username
        email
        gender
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(1),
    },
    '& .MuiButton-root': {
      margin: 'auto',
      display: 'block',
    },
    padding: '5px',
  },
  form: {
    width: theme.spacing(60),
    margin: 'auto',
  },
}));

export default function LoginForm(props) {
  const [formState, setFormState] = React.useState({
    usr_or_email: '',
    password: '',
  });
  const handleChange = event => {
    const { name, value } = event.target;

    setFormState(prevState => ({ ...prevState, [name]: value }));
  };
  const { usrOrEmail, password } = formState;
  const classes = useStyles();
  const [logIn, { data, loading, error }] = useMutation(LOGIN_USER);
  const handleSubmit = e => {
    e.preventDefault();
    logIn({ variables: { usrOrEmail, password } });
  };

  return (
    <Paper className={classes.root} elevation={3}>
      <Typography variant='h4' align='center' gutterBottom>
        Sign In
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}>
        <TextField
          id='filled-usr_or_email'
          label='Email'
          value={usrOrEmail}
          onChange={handleChange}
          variant='filled'
          name='usrOrEmail'
          fullWidth
        />

        <TextField
          id='filled-signin-password'
          label='Password'
          value={password}
          onChange={handleChange}
          variant='filled'
          name='password'
          type='password'
          fullWidth
        />
        <div>
          <Button
            color='secondary'
            variant='contained'
            size='large'
            type='submit'>
            Log In
          </Button>
        </div>
      </form>
      <DisplayAlert loading={loading} error={error} data={data?.logIn} />
    </Paper>
  );
}
