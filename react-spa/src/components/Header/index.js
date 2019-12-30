import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, Grid } from '@material-ui/core';
import { lightBlue, green } from '@material-ui/core/colors';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import DisplayAlert from '../Utils/DisplayAlert';

import { useSession } from '../../hooks';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    backgroundColor: lightBlue[500],
    display: 'flex',

    '& .MuiButton-root': {
      backgroundColor: green[500],
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
        signOut();
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
        <Button variant='contained' onClick={onClickHandler}>
          Log Out
        </Button>
      </Paper>
      <DisplayAlert loading={loading} error={error} data={data?.logOut} />
    </Grid>
  );
}
