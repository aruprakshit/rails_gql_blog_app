import React from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

  return (
    <Paper className={classes.root} elevation={3}>
      <Typography variant='h4' align='center' gutterBottom>
        Sign Up
      </Typography>
      <form className={classes.form} noValidate autoComplete='off'>
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
          fullWidth
        />
        <div>
          <Button color='primary' variant='contained' size='large'>
            Register
          </Button>
        </div>
      </form>
    </Paper>
  );
}
