import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Card } from '@material-ui/core';

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders,
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          xs={12}
        >
          <Card
            className={classes.root}
          >
            <Typography variant="h1">
              Title
            </Typography>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Card
            className={classes.root}
          >
            <Typography variant="subtitle1">
              Sub1
            </Typography>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Card
            className={classes.root}
          >
            <Typography variant="body1">
              Body
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
