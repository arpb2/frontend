import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isLoggedIn } from '../../common/auth';


const ProtectedRouteWithLayout = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        isLoggedIn
          ? (
            <Layout>
              <Component {...matchProps} />
            </Layout>
          )
          : <Redirect to="/sign-in" />
      )}
    />
  );
};

ProtectedRouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default ProtectedRouteWithLayout;
