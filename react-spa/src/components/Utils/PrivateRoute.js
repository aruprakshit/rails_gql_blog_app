import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useSession } from '../../hooks';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useSession();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
