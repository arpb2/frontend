import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';

import mockData from './data';

const useStyles = makeStyles(() => ({
  root: {
  },
  details: {
    display: 'flex',
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  mail: {
    verticalAlign: 'super',
  },
}));

const Professor = (props) => {
  const { className, classroomId, ...rest } = props;

  const classes = useStyles();

  const [professor] = useState(mockData);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h3"
            >
              {`${professor.name} ${professor.surname}`}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
              gutterBottom
            >
              {professor.position}
            </Typography>
            <MailIcon />
            <Typography
              className={classes.mail}
              color="textSecondary"
              variant="body1"
              display="inline"
            >
              {' '}
              {professor.mail}
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={professor.avatar}
          />
        </div>
      </CardContent>
      <Divider />
    </Card>
  );
};

Professor.propTypes = {
  className: PropTypes.string,
  classroomId: PropTypes.number,
};

export default Professor;
