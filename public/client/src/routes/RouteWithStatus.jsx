import React from 'react';
import useAuth from '../components/auth/Auth';
import { Route } from 'react-router-dom';

export default function RoutesWithStatus({ component: Component, ...props }) {
  const [user, isSignedIn] = useAuth(props.user, props.isSignedIn);

  return (
    <Route
      {...props}
      render={(props) => {
          return <Component isSignedIn={isSignedIn} {...props} />;
      }}
    />
  );
}
