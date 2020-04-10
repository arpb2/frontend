import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex',
  },
  avatar: {
    marginLeft: 'auto',
    height: 100,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
}));

const AccountProfile = (props) => {
  const {
    className, user, ...rest
  } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {user.name}
              {' '}
              {user.surname}
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
        </div>
      </CardContent>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
};

export default AccountProfile;
