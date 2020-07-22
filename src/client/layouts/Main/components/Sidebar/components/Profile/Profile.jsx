import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const defaultAvatar = '/public/images/avatars/vader.png';

  const [user, setUser] = useState({
    name: '',
    surname: '',
    avatar: defaultAvatar,
    level: null,
    loaded: false,
  });

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session && !user.loaded) {
      fetch(`/api/users/${session.user_id}`, {
        method: 'GET',
        headers: {
          Authorization: session.token,
        },
      })
        .then(res => res.json())
        .then((userData) => {
          const avatar = userData.avatar ? userData.avatar : defaultAvatar;
          const level = userData.level ? userData.level : 7;
          setUser({
            ...userData, avatar, level, loaded: true,
          });
        });
    }
  });

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {`${user.name} ${user.surname}`}
      </Typography>
      <Typography variant="body2">{user.current_level ? `Nivel ${user.current_level}` : ''}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
