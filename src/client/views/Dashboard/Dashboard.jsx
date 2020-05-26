import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid, Typography, Card, Avatar,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
  title: {
    padding: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
  },
  titleText: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  avatar: {
    width: 100,
    height: 100,
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
            className={classes.title}
          >
            <div>
              <Typography variant="h1" className={classes.titleText}>
                ¡Bienvenido a ARPB2!
              </Typography>
              {' '}
              <Typography variant="subtitle1" className={classes.titleText}>
                Programación interactiva + realidad aumentada
              </Typography>
            </div>

            <Avatar
              alt="ARPB2 Logo"
              className={classes.avatar}
              src="/public/images/logos/logo-arpb2.svg"
            />
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
              ARPB2 es un juego diseñado para Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium ipsa officiis debitis veniam animi libero vel! Natus totam maxime nisi consequatur quod accusantium facere, eos similique suscipit. Magnam, illum est.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id quod soluta sequi animi dolores nam nostrum voluptas exercitationem? Voluptate, odio laborum qui accusamus veritatis natus cum amet dolor. Eveniet, animi!
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse odit nostrum officiis soluta, doloremque quae expedita odio nemo rem dolor quisquam! Consectetur temporibus blanditiis maiores, consequatur perferendis repellendus earum. Est?
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo voluptatum provident nulla modi tempore officiis aliquid eos, nam vel assumenda optio. Ipsa aliquam, nostrum odio molestiae ut recusandae laborum ducimus.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
