import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
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
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const Students = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [products] = useState(mockData);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Students"
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {products.map((product, i) => (
            <ListItem
              divider={i < products.length - 1}
              key={product.id}
            >
              <ListItemAvatar>
                <img
                  alt="Product"
                  className={classes.image}
                  src={product.imageUrl}
                />
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                secondary={`Updated ${product.updatedAt.fromNow()}`}
              />
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
};

export default Students;
