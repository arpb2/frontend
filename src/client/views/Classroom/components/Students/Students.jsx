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
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { isTeacher } from '../../../../common/auth';

import mockData from './data';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
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
    marginTop: '8%',
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
    className, classroomId, history, ...rest
  } = props;

  const classes = useStyles();

  const [students] = useState(mockData);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewCodeClick = student => (event) => {
    history.push(`/users/${student.id}/code`);
  };

  const hasStudents = () => students.length > 0;

  const [dialogOpen, setDialogOpen] = React.useState(false);

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
        if (!response.ok) throw Error(response.statusText); // TODO: Show snackbar
        return response.json();
      })
      .then((data) => {
        // TODO: Show snackbar
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

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        subtitle={`${students.length} in total`}
        title="Students"
      />
      {hasStudents() ? (
        <Fragment>
          <Divider />
          <CardContent className={classes.content}>
            <List>
              {students.map((student, i) => (
                <ListItem
                  divider={i < students.length - 1}
                  key={student.id}
                >
                  <ListItemAvatar>
                    <img
                      alt="Product"
                      className={classes.image}
                      src={student.imageUrl}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${student.name} ${student.surname}`}
                    secondary={`Level ${student.lastLevel}`}
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
          <Divider />
        </Fragment>
      )
        : (
          <Fragment>
            <CardContent className={classes.contentNoStudents}>
              <Button variant="contained" color="primary" onClick={handleDialogClickOpen} className={classes.addBtn}>
                Add students
              </Button>
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
            </CardContent>
          </Fragment>
        ) }
    </Card>
  );
};

Students.propTypes = {
  className: PropTypes.string,
  classroomId: PropTypes.number,
  history: PropTypes.object,
};

export default Students;
