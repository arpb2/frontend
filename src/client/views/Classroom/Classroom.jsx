import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Students, Professor } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Classroom = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          md={9}
          xs={12}
        >
          <Students />
        </Grid>
        <Grid
          item
          md={3}
          xs={12}
        >
          <Professor />
        </Grid>
      </Grid>
    </div>
  );
};

export default Classroom;
