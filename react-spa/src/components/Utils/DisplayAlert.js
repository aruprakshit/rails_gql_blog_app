import React from 'react';
import SimpleSnackbar from './SimpleSnackbar';

export default function DisplayAlert({ loading, error, data }) {
  if (!loading && (error !== undefined || data !== undefined)) {
    if (data?.errors !== void 0 && data?.errors?.length !== 0) {
      return (
        <SimpleSnackbar content={data.errors.join('. ')} showSnackbar={true} />
      );
    }
  }

  return null;
}
