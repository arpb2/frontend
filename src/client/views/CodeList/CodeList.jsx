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
import { Container, Card, Snackbar } from '@material-ui/core';
import darcula from 'react-syntax-highlighter/dist/esm/styles/hljs/darcula';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import MuiAlert from '@material-ui/lab/Alert';


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
    className, history, match, ...rest
  } = props;

  const userId = match.params.id;

  const classes = useStyles();
  const [open, setOpen] = useState({});

  const handleClick = id => (e) => {
    setOpen({
      ...open,
      [id]: !open[id],
    });
  };

  const [codeList, setCodeList] = useState([]);

  const [loaded, setLoaded] = useState(false);

  const [snackbar, setSnackbar] = useState({ severity: '', message: '' });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/users/${userId}/code`)
      .then((res) => {
        if (!res.ok) {
          setSnackbar({ severity: 'error', message: 'Ocurrió un error al cargar el código del alumno. Por favor reintente más tarde.' });
          setSnackbarOpen(true);
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((code) => {
        if (code && code.length > 0) {
          setCodeList(
            code,
          );
        } else {
          setCodeList([]);
        }
      });
    setLoaded(true);
  }, [loaded, userId]);

  const noCodePlaceholder = () => <ListItem><ListItemText primary="No hay código guardado" /></ListItem>;

  const Alert = alertProps => <MuiAlert elevation={6} variant="filled" {...alertProps} />;

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const getCodeList = () => codeList.map((code, i) => (
    <Fragment>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <ListItem button onClick={handleClick(i)}>
        <ListItemText primary={`Level ${code.level_id}`} />
        {open[i] ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open[i]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
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
  ));

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
              Código
            </ListSubheader>
      )}
          className={classes.list}
        >
          {codeList.length === 0 ? noCodePlaceholder() : getCodeList()}
        </List>
      </Card>
    </Container>
  );
};

CodeList.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object,
  match: PropTypes.object,
};

export default CodeList;
