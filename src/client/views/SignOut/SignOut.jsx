import React from 'react';
import { withRouter } from 'react-router-dom';

import { logout, isLoggedIn } from '../../common/auth';


const SignOut = (props) => {
  const signOut = () => {
    console.log('out');

    if (isLoggedIn()) {
      logout();
      window.location.href = '/';
    }
  };


  return (
    <div>
      {signOut()}
    </div>
  );
};

export default withRouter(SignOut);
