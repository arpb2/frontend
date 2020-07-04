import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card, CardContent, Grid, Typography, Tooltip, IconButton, Snackbar,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import MuiAlert from '@material-ui/lab/Alert';
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
  const { className, classroom, ...rest } = props;

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({ severity: '', message: '' });

  const Alert = alertProps => <MuiAlert elevation={6} variant="filled" {...alertProps} />;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleLevelChange = direction => (event) => {
    const session = JSON.parse(localStorage.getItem('session'));
    const delta = direction === 'increase' ? 1 : -1;
    const body = classroom;
    delete body.students;
    fetch(`/api/classrooms/${classroom.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...body,
        level: body.level + delta,
      }),
      headers: {
        Authentication: session.token,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) throw new Error();
      res.json();
    })
      .then((res) => {
        setSnackbar({ severity: 'success', message: 'Nivel actualizado' });
        setOpen(true);
        setTimeout(() => {
          window.location.reload(1);
        }, 3000);
      }).catch((err) => {
        setSnackbar({ severity: 'error', message: 'Ocurrió un error al cambiar de nivel' });
        setOpen(true);
      });
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
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
              Nivel actual
            </Typography>
            <Typography variant="h1">{classroom.level}</Typography>
            {isTeacher()
            && (
            <Fragment>
              <Tooltip title="Subir nivel">
                <IconButton aria-label="increase" onClick={handleLevelChange('increase')}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Bajar nivel">
                <IconButton aria-label="decrease" onClick={handleLevelChange('decrease')}>
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
  classroom: PropTypes.object,
};

export default CurrentLevel;
