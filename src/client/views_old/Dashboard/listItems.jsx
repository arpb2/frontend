import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExtensionIcon from '@material-ui/icons/Extension';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ExtensionIcon />
      </ListItemIcon>
      <Link to="/blockly" />
      <ListItemText primary="Blockly" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Subheader</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Suboption" />
    </ListItem>
  </div>
);
