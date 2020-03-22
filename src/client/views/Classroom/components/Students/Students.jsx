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
} from '@material-ui/core';

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
  points: {
    textAlign: 'end',
  },
}));

const Students = (props) => {
  const { className, classroomId, ...rest } = props;

  const classes = useStyles();

  const [students] = useState(mockData);

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
              <ListItemText primary={`Points ${student.points}`} className={classes.points} />
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
