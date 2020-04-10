import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { getUserId, getUserToken } from '../../common/auth';

import { AccountProfile, AccountDetails } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Account = () => {
  const classes = useStyles();

  const [user, setUser] = useState({
    name: 'Shen',
    surname: 'Zhi',
    email: 'shen@gmail.com',
    avatar: '/public/images/avatars/vader.png',
  });

  useEffect(() => {
    fetch(`/api/users/${getUserId()}`, {
      method: 'GET',
      headers: {
        Authorization: getUserToken(),
      },
    })
      .then(res => res.json())
      .then((userData) => {
        setUser({ ...userData, avatar: userData.avatar ? userData.avatar : '/public/images/avatars/vader.png' });
      });
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <AccountProfile user={user} />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <AccountDetails user={user} getToken={getUserToken} setUser={setUser} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
