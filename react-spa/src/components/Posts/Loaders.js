import React from 'react';
import { Grid, LinearProgress } from '@material-ui/core';

export function QueryLoading({ loading }) {
  if (!loading) return null;

  return (
    <Grid item xs={10}>
      <LinearProgress variant='query' />
    </Grid>
  );
}
