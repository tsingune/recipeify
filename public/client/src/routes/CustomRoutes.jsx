import React from 'react';
import useAuth from '../components/auth/Auth';
import { Route, Redirect } from 'react-router-dom';

export default function CustomRoutes({ component: Component, ...props }) {
  const [user, isSignedIn] = useAuth(props.user, props.isSignedIn);

  return (
    <Route
      {...props}
      render={(props) => {
        if (isSignedIn === true) {
          return <Redirect to={{ pathname: '/explore' }} />;
        } else if (isSignedIn === false) {
          return <Component {...props} />;
        } else {
          return <div>Loading...</div>;
        }
      }}
    />
  );
}
