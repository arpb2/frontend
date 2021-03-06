import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MemoryIcon from '@material-ui/icons/Memory';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SignOutIcon from '@material-ui/icons/Input';
import MenuBook from '@material-ui/icons/MenuBook';

import { Profile, SidebarNav } from './components';
import { isLoggedIn } from '../../../../common/auth';


const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const Sidebar = (props) => {
  const {
    open, variant, onClose, className, ...rest
  } = props;

  const classes = useStyles();

  const classroomId = isLoggedIn() ? JSON.parse(localStorage.getItem('session')).classroom_id : 0;

  const pages = [
    {
      title: 'Inicio',
      href: '/dashboard',
      icon: <DashboardIcon />,
    },
    {
      title: 'Niveles',
      href: '/blockly/1',
      icon: <MemoryIcon />,
    },
  ];

  if (classroomId !== 0) {
    pages.push({
      title: 'Aula',
      href: `/classroom/${classroomId}`,
      icon: <MenuBook />,
    });
  }

  pages.push({
    title: 'Cuenta',
    href: '/account',
    icon: <AccountBoxIcon />,
  });

  if (variant === 'temporary') {
    pages.push({
      title: 'Salir',
      href: '/sign-out',
      icon: <SignOutIcon />,
    });
  }


  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
