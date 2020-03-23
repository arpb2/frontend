import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
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
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import mockData from './data';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  content: {
    padding: 0,
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: '50%',
  },
}));

const Students = (props) => {
  const { className, classroomId, ...rest } = props;

  const classes = useStyles();

  const [students] = useState(mockData);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              <IconButton
                edge="end"
                size="small"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
    </Card>
  );
};

Students.propTypes = {
  className: PropTypes.string,
  classroomId: PropTypes.string,
};

export default Students;
