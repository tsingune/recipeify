import React from 'react';

import useAuth from '../components/auth/Auth';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoutes({ component: Component, ...props }) {
  const [user, isSignedIn] = useAuth(props.user, props.isSignedIn);

  return (
    <Route
      {...props}
      render={(props) => {
        if (isSignedIn === true) {
          return <Component {...props} isSignedIn={isSignedIn} user={user} />;
        } else if (isSignedIn === false) {
          return <Redirect to={{ pathname: '/login' }} />;
        } else {
          return <div>Loading...</div>;
        }
      }}
    />
  );
}
