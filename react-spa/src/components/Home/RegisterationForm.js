import React from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import DisplayAlert from './DisplayAlert';

const REGISTER_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password) {
      user {
        id
        username
        email
        ownedPosts {
          body
        }
      }

      errors
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

export default function RegisterationForm(props) {
  const [formState, setFormState] = React.useState({
    username: '',
    email: '',
    password: '',
  });
  const handleChange = event => {
    const { name, value } = event.target;

    setFormState(prevState => ({ ...prevState, [name]: value }));
  };
  const { email, username, password } = formState;
  const classes = useStyles();

  const [signUp, { data, loading, error }] = useMutation(REGISTER_USER);

  const handleSubmit = e => {
    e.preventDefault();
    signUp({ variables: { email, username, password } });
  };

  return (
    <Paper className={classes.root} elevation={3}>
      <Typography variant='h4' align='center' gutterBottom>
        Sign Up
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}>
        <TextField
          id='filled-email'
          label='Email'
          value={email}
          onChange={handleChange}
          variant='filled'
          name='email'
          fullWidth
        />

        <TextField
          id='filled-username'
          label='Username'
          value={username}
          onChange={handleChange}
          variant='filled'
          name='username'
          fullWidth
        />

        <TextField
          id='filled-password'
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
            color='primary'
            variant='contained'
            size='large'
            type='submit'>
            Register
          </Button>
          {loading && <CircularProgress />}
        </div>
      </form>
      <DisplayAlert loading={loading} error={error} data={data?.signUp} />
    </Paper>
  );
}
