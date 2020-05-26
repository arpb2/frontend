import React, { useState, useEffect, Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles(() => ({
  root: {},
}));

const AccountDetails = (props) => {
  const {
    className, user, getToken, setUser, ...rest
  } = props;

  const classes = useStyles();

  // Snackbar
  const [open, setOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({ severity: '', message: '' });

  const Alert = alertProps => <MuiAlert elevation={6} variant="filled" {...alertProps} />;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [values, setValues] = useState({
    name: 'Shen',
    surname: 'Zhi',
    email: 'shen@gmail.com',
    avatar: '/public/images/avatars/vader.png',
    password: '',
    confirm: '',
  });

  useEffect(() => setValues(user), [user]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = e => (event) => {
    const body = { name: values.name, surname: values.surname, email: values.email };
    if (values.password !== '' && values.password === values.confirm) {
      body.password = values.password;
    }
    fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
    })
      .then(res => res.json())
      .then((userData) => {
        setUser(userData);
        setSnackbar({ severity: 'success', message: 'Cambios guardados' });
        setOpen(true);
      }).catch((err) => {
        setSnackbar({ severity: 'error', message: 'Ocurrió un error al guardar, reintente luego' });
        setOpen(true);
      });
  };

  return (
    <Fragment>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <form
          autoComplete="off"
          noValidate
        >
          <CardHeader
            title="Perfil"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  helperText="Por favor indique su nombre"
                  label="Nombre"
                  margin="dense"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Apellido"
                  margin="dense"
                  name="surname"
                  onChange={handleChange}
                  required
                  value={values.surname}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Email"
                  margin="dense"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                  variant="outlined"
                />

              </Grid>
              <Grid
                container
                item
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Contraseña"
                    name="password"
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    margin="dense"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Confirme su contraseña"
                    name="confirm"
                    onChange={handleChange}
                    type="password"
                    margin="dense"
                    value={values.confirm}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              onClick={handleSave()}
            >
              Guardar
            </Button>
          </CardActions>
        </form>
      </Card>
    </Fragment>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
};

export default AccountDetails;
