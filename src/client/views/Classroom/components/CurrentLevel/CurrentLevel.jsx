import React, { Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card, CardContent, Grid, Typography, Tooltip, IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { isTeacher } from '../../../../common/auth';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  differenceIcon: {
    color: theme.palette.success.dark,
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1),
  },
}));

const CurrentLevel = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body1"
            >
              Current level
            </Typography>
            <Typography variant="h1">7</Typography>
            {isTeacher()
            && (
            <Fragment>
              <Tooltip title="Increase level">
                <IconButton aria-label="increase">
                  <AddIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Decrease level">
                <IconButton aria-label="decrease">
                  <RemoveIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Fragment>
            )
            }

          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

CurrentLevel.propTypes = {
  className: PropTypes.string,
};

export default CurrentLevel;
