import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


const ProtectedRouteWithLayout = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        localStorage.getItem('session')
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
