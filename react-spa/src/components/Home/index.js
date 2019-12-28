import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RegisterationForm from './RegisterationForm';
import LoginForm from './LoginForm';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '10%',
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(70),
      height: theme.spacing(50),
    },
    '& .MuiTypography-root': {
      marginTop: theme.spacing(4),
    },
  },
}));

export default function Home(params) {
  const classes = useStyles();

  return (
    <Container className={classes.root} fixed>
      <RegisterationForm />
      <LoginForm />
    </Container>
  );
}
