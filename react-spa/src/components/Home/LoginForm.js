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

export default function LoginForm(props) {
  const [formState, setFormState] = React.useState({
    usr_or_email: '',
    password: '',
  });
  const handleChange = event => {
    const { name, value } = event.target;

    setFormState(prevState => ({ ...prevState, [name]: value }));
  };
  const { usr_or_email, password } = formState;
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={3}>
      <Typography variant='h4' align='center' gutterBottom>
        Sign In
      </Typography>
      <form className={classes.form} noValidate autoComplete='off'>
        <TextField
          id='filled-usr_or_email'
          label='Email'
          value={usr_or_email}
          onChange={handleChange}
          variant='filled'
          name='usr_or_email'
          fullWidth
        />

        <TextField
          id='filled-signin-password'
          label='Password'
          value={password}
          onChange={handleChange}
          variant='filled'
          name='password'
          fullWidth
        />
        <div>
          <Button color='secondary' variant='contained' size='large'>
            Log In
          </Button>
        </div>
      </form>
    </Paper>
  );
}
