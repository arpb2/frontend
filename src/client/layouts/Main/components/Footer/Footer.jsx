import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
  },
  blocklyLogo: {
    width: '20%',
    float: 'right',
  },
}));

const Footer = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div>
        <Typography variant="body1">
          &copy;
          {' '}
          ARPB2
          2020
        </Typography>
        <Typography variant="caption">
          For academic use only in
          {' '}
          <Link
            component="a"
            href="http://www.fi.uba.ar/"
            target="_blank"
          >
            FIUBA

          </Link>
        </Typography>
      </div>

      <Link href="https://developers.google.com/blockly" target="_blank">
        <img
          alt="Blockly Logo"
          src="/public/images/logos/blockly_logo.svg"
          className={classes.blocklyLogo}
        />
      </Link>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
