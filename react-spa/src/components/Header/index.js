import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, Grid, Icon } from '@material-ui/core';
import { lightBlue, red, brown } from '@material-ui/core/colors';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import DisplayAlert from '../Utils/DisplayAlert';
import { Link } from 'react-router-dom';

import { useSession } from '../../hooks';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    backgroundColor: lightBlue[500],
    display: 'flex',
    '& .MuiButton-root': {
      backgroundColor: red['A400'],
      marginLeft: 'auto',
    },
  },
}));

const LOGOUT_USER = gql`
  mutation logout {
    logOut {
      errors
      message
    }
  }
`;

export default function Header() {
  const classes = useStyles();
  const { logOut: signOut } = useSession();
  const [logOut, { data, loading, error }] = useMutation(LOGOUT_USER, {
    onCompleted: data => {
      if (data.logOut.errors.length === 0) {
        signOut(() => window.location.reload());
      }
    },
  });

  const onClickHandler = e => {
    e.preventDefault();
    logOut();
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.root} elevation={3} square>
        <Link to='/'>
          <Icon style={{ fontSize: 40, color: brown[700] }}>home</Icon>
        </Link>
        <Button variant='contained' onClick={onClickHandler}>
          Log Out
        </Button>
      </Paper>
      <DisplayAlert loading={loading} error={error} data={data?.logOut} />
    </Grid>
  );
}
