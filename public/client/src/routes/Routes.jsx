import React from 'react';
import { HashRouter, Switch, Route,Redirect } from 'react-router-dom';
import Explore from '../components/explore';

import Login from '../components/login/Login';
import SignUp from '../components/signup/SignUp';
import AddRecipe from '../components/addRecipe/AddRecipe';

import CustomRoutes from './CustomRoutes';
import Page404 from '../components/error/Page404';
import ProtectedRoutes from './ProtectedRoutes';
import RoutesWithStatus from './RouteWithStatus';
import Homepage from '../components/homepage';


function Routes() {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <RoutesWithStatus path="/explore" exact component={Explore} />
          <CustomRoutes path="/login" exact component={Login} />
          <CustomRoutes path="/signup" exact component={SignUp} />
          <ProtectedRoutes path="/addRecipe" exact component={AddRecipe} />
          <Route path="/Page404" exact component={Page404} />
          <Redirect to="/Page404" />
        </Switch>
      </HashRouter>
    </>
  );
}

export default Routes;
