import React, { useState, Fragment, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import validate from 'validate.js';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { isTeacher } from '../../../../common/auth';

const useStyles = makeStyles(theme => ({
  root: {
  },
  content: {
    padding: 0,
  },
  contentNoStudents: {
    textAlign: 'center',
    height: '80%',
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: '50%',
  },
  addBtn: {
    margin: theme.spacing(2),
    marginLeft: 0,
  },
}));

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64,
    },
  },
};

const Students = (props) => {
  const {
    className, classroomId, history, students, ...rest
  } = props;

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({ severity: '', message: '' });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewCodeClick = (event) => {
    const { studentId } = anchorEl.dataset;
    history.push(`/users/${studentId}/code`);
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClickOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogMainAction = (e) => {
    e.preventDefault();
    fetch(`/api/classrooms/${classroomId}/students`, {
      method: 'POST',
      body: JSON.stringify(formState.values),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          setSnackbar({ severity: 'error', message: 'Ocurrió un error al agregar al alumno. Por favor reintente más tarde.' });
          setSnackbarOpen(true);
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(() => {
        setSnackbar({ severity: 'success', message: 'Alumno agregado con éxito' });
        setSnackbarOpen(true);
      });
  };

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

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

  const Alert = alertProps => <MuiAlert elevation={6} variant="filled" {...alertProps} />;

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Fragment>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardHeader
          subtitle={`${students.length} en total`}
          title="Alumnos"
        />
        <Divider />
        <CardContent className={classes.content}>
          <List>
            {students.map((student, i) => (
              <ListItem
                divider={i < students.length - 1}
                key={student.id}
              >
                <ListItemText
                  primary={`${student.name} ${student.surname}`}
                  secondary={isTeacher() ? `${student.email}` : ''}
                />
                {isTeacher() && (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    size="small"
                    data-student-id={student.id}
                    onClick={handleClick}
                    aria-controls="student-actions-menu"
                    aria-haspopup="true"
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="student-actions-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem data-student-id={student.id} onClick={handleViewCodeClick}>Ver código</MenuItem>
                  </Menu>
                </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {isTeacher() && (
      <Button variant="contained" color="primary" onClick={handleDialogClickOpen} className={classes.addBtn}>
        Agregar alumno
      </Button>
      )}
      <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <form className={classes.form} autoComplete="off" onSubmit={handleDialogMainAction}>
          <DialogContent>
            <DialogContentText>
              Ingrese el email del alumno al que desea agregar
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="emailForm"
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Agregar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

Students.propTypes = {
  className: PropTypes.string,
  classroomId: PropTypes.number,
  history: PropTypes.object,
  students: PropTypes.array,
};

Students.defaultProps = {
  students: [],
};

export default Students;
