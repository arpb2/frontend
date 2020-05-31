import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Divider, Grid, Typography, Card, Avatar,
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
  introText: {
    padding: theme.spacing(4),
  },
}));

const introText = `ARPB2 es un juego diseñado para introducirte al mundo de la programación.

Vas a aprender los conceptos básicos de lógica, operaciones, variables hasta operar con tus propias funciones definidas por vos mismo.

Todo esto lo vas a poder hacer utilizando Blockly, una herramienta diseñada por Google y utilizada por el MIT para enseñar programación a través de bloques visuales y vas a poder ver el resultado en varios lenguajes de programación reales utilizados hoy en día en la industria.

En ARPB2, Blockly conoce la realidad aumentada, tu obejtivo es que tu robot llegue al objetivo.

No hay un único camino correcto, como en la programación, existen varias formas de obtener el mismo resultado. ¡Exploralas todas!
`;

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
              <Divider />
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
            className={classes.introText}
          >
            {introText.split('\n').map((item, i) => (
              <Typography key={i} variant="body1" paragraph>
                {item}
              </Typography>
            ))}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
