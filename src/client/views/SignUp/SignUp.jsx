import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography,
  Select,
  FormHelperText,
  Snackbar,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MuiAlert from '@material-ui/lab/Alert';
import { logout } from '../../common/auth';

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32,
    },
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32,
    },
  },
  userType: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
      minimum: 8,
    },
  },
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
  grid: {
    height: '100%',
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/public/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px',
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300,
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white,
  },
  bio: {
    color: theme.palette.white,
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  policyCheckbox: {
    marginLeft: '-14px',
  },
  signUpButton: {
    margin: theme.spacing(2, 0),
  },
}));

const useQuery = () => new URLSearchParams(useLocation().search);

const SignUp = (props) => {
  const { history } = props;

  const query = useQuery();

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const [open, setOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({ severity: '', message: '' });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleSignUp = (event) => {
    const body = { ...formState.values, deviceToken: query.get('deviceToken'), webToken: localStorage.getItem('webToken') };
    event.preventDefault();
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        logout();
        setSnackbar({ severity: 'success', message: 'Cuenta generada con éxito. A continuación podes loguearte con tus datos.' });
        setOpen(true);
        setTimeout(() => {
          history.push('/sign-in');
        }, 3000);
      }).catch((err) => {
        setSnackbar({ severity: 'error', message: 'Ocurrió un error al registrarse. Intente más tarde.' });
        setOpen(true);
      });
  };

  const hasError = field => (!!(formState.touched[field] && formState.errors[field]));

  const Alert = alertProps => <MuiAlert elevation={6} variant="filled" {...alertProps} />;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignUp}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Creá tu nueva cuenta
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Utilizá tu email para crear tu cuenta
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('firstName')}
                  fullWidth
                  helperText={
                    hasError('firstName') ? formState.errors.firstName[0] : null
                  }
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.firstName || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('lastName')}
                  fullWidth
                  helperText={
                    hasError('lastName') ? formState.errors.lastName[0] : null
                  }
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.lastName || ''}
                  variant="outlined"
                />
                <Select
                  native
                  value={formState.values.userType || ''}
                  onChange={handleChange}
                  inputProps={{
                    name: 'userType',
                    id: 'user-type-select',
                  }}
                  fullWidth
                  className={classes.textField}
                  variant="outlined"
                >
                  <option value="" />
                  <option value="student">Alumno</option>
                  <option value="teacher">Profesor</option>
                </Select>
                <FormHelperText>User type</FormHelperText>
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Registrate ahora
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  ¿Ya tenes cuenta?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/sign-in"
                    variant="h6"
                  >
                    Ingresá acá
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SignUp);
