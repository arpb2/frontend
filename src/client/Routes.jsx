import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout, ProtectedRouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  Account as AccountView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Blockly as BlocklyView,
  Classroom as ClassroomView,
  CodeList as CodeListView,
  SignOut as SignOutView,
} from './views';

const Routes = () => (
  <Switch>
    <Redirect
      exact
      from="/"
      to="/dashboard"
    />
    <RouteWithLayout
      component={DashboardView}
      exact
      layout={MainLayout}
      path="/dashboard"
    />
    <ProtectedRouteWithLayout
      component={AccountView}
      exact
      layout={MainLayout}
      path="/account"
    />
    <RouteWithLayout
      component={SignUpView}
      exact
      layout={MinimalLayout}
      path="/sign-up"
    />
    <RouteWithLayout
      component={SignInView}
      exact
      layout={MinimalLayout}
      path="/sign-in"
    />
    <ProtectedRouteWithLayout
      component={BlocklyView}
      layout={MainLayout}
      path="/blockly/:id"
    />
    <ProtectedRouteWithLayout
      component={ClassroomView}
      layout={MainLayout}
      path="/classroom/:id"
    />
    <ProtectedRouteWithLayout
      component={CodeListView}
      layout={MainLayout}
      path="/users/:id/code"
    />
    <RouteWithLayout
      component={NotFoundView}
      exact
      layout={MinimalLayout}
      path="/not-found"
    />
    <RouteWithLayout
      component={SignOutView}
      exact
      layout={MinimalLayout}
      path="/sign-out"
    />
    <Redirect to="/not-found" />
  </Switch>
);

export default Routes;
