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
  ListItemAvatar,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
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

  const handleViewCodeClick = student => (event) => {
    history.push(`/users/${student.id}/code`);
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
          setSnackbar({ severity: 'error', message: 'Ocurrió un error al agregar al almuno. Por favor reintente más tarde.' });
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
                  secondary={`Nivel ${student.lastLevel}`}
                />
                {isTeacher() && (
                <Fragment>
                  <IconButton
                    edge="end"
                    size="small"
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
                    <MenuItem id="view-code" onClick={handleViewCodeClick(student)}>View code</MenuItem>
                  </Menu>
                </Fragment>
                )}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {isTeacher() && (
      <Button variant="contained" color="primary" onClick={handleDialogClickOpen} className={classes.addBtn}>
        Add students
      </Button>
      )}
      <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <form className={classes.form} autoComplete="off" onSubmit={handleDialogMainAction}>
          <DialogContent>
            <DialogContentText>
              Type the email of the student you want to add to the classroom
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="emailForm"
              label="Email Address"
              type="email"
              name="email"
              onChange={handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
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
