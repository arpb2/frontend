import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout, ProtectedRouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Blockly as BlocklyView,
  Classroom as ClassroomView,
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
    <RouteWithLayout
      component={UserListView}
      exact
      layout={MainLayout}
      path="/users"
    />
    <RouteWithLayout
      component={ProductListView}
      exact
      layout={MainLayout}
      path="/products"
    />
    <RouteWithLayout
      component={TypographyView}
      exact
      layout={MainLayout}
      path="/typography"
    />
    <RouteWithLayout
      component={IconsView}
      exact
      layout={MainLayout}
      path="/icons"
    />
    <ProtectedRouteWithLayout
      component={AccountView}
      exact
      layout={MainLayout}
      path="/account"
    />
    <RouteWithLayout
      component={SettingsView}
      exact
      layout={MainLayout}
      path="/settings"
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
      exact
      layout={MainLayout}
      path="/blockly"
    />
    <ProtectedRouteWithLayout
      component={ClassroomView}
      exact
      layout={MainLayout}
      path="/classroom"
    />
    <RouteWithLayout
      component={NotFoundView}
      exact
      layout={MinimalLayout}
      path="/not-found"
    />
    <Redirect to="/not-found" />
  </Switch>
);

export default Routes;
