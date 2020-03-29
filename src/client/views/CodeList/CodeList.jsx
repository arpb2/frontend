import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Container, Card } from '@material-ui/core';
import darcula from 'react-syntax-highlighter/dist/esm/styles/hljs/darcula';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(4),
  },
  list: {

  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const CodeList = (props) => {
  const {
    className, history, ...rest
  } = props;

  const classes = useStyles();
  const [open, setOpen] = useState({});

  const handleClick = id => (e) => {
    setOpen({
      ...open,
      [id]: !open[id],
    });
  };

  const [codes, setCodes] = useState([
    {
      level_id: 0,
      user_id: 0,
      code: "const test = () => { 'I am a test' }",
    },
    {
      level_id: 1,
      user_id: 0,
      code: "const test = () => { 'I am a test' }",
    },
    {
      level_id: 2,
      user_id: 0,
      code: "const test = () => { 'I am a test' }",
    },
  ]);

  return (
    <Container className={classes.root}>
      <Card
        {...rest}
        className=""
      >
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={(
            <ListSubheader component="div" id="nested-list-subheader">
              Code
            </ListSubheader>
      )}
          className={classes.list}
        >
          {codes.map((code, i) => (
            <Fragment>
              <ListItem button onClick={handleClick(i)}>
                <ListItemText primary={`Level ${code.level_id}`} />
                {open[i] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open[i]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem className={classes.nested}>
                    <SyntaxHighlighter
                      language="javascript"
                      style={darcula}
                      showLineNumbers
                      id="code"
                    >
                      {code.code}
                    </SyntaxHighlighter>
                  </ListItem>
                </List>
              </Collapse>
            </Fragment>
          ))}
        </List>
      </Card>
    </Container>
  );
};

CodeList.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object,
};

export default CodeList;
