/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, Typography, Paper, Container, Snackbar,
} from '@material-ui/core';
import ReactBlocklyComponent from 'react-blockly';
import Blockly from 'blockly';
import { makeStyles } from '@material-ui/styles';
import SaveIcon from '@material-ui/icons/Save';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import lua from 'react-syntax-highlighter/dist/esm/languages/hljs/lua';
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
import dart from 'react-syntax-highlighter/dist/esm/languages/hljs/dart';
import darcula from 'react-syntax-highlighter/dist/esm/styles/hljs/darcula';
import { Steps } from 'intro.js-react';
import MuiAlert from '@material-ui/lab/Alert';
import { useParams } from 'react-router-dom';
import parseWorkspaceXml from './BlocklyHelper';


import 'blockly/python';
import 'blockly/php';
import 'blockly/lua';
import 'blockly/javascript';
import 'blockly/dart';
import './blocks/custom/blocks';
import 'intro.js/introjs.css';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('lua', lua);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('dart', dart);

const useStyles = makeStyles(theme => ({
  root: {
  },
  blockly: {
    minHeight: '60vh',
  },
  '@media (min-width: 400px)': {
    theory: {
      minHeight: '60vh',
    },
  },
  theory: {
    padding: '8px',
  },
  tooltip: {
    fontFamily: 'roboto',
  },
}));

const MyBlockly = (props) => {
  const {
    className, onChange, style, history, ...rest
  } = props;

  const { id } = useParams();

  const classes = useStyles();

  const languages = [
    {
      value: 'JavaScript',
      label: 'JavaScript',
    },
    {
      value: 'Python',
      label: 'Python',
    },
    {
      value: 'Lua',
      label: 'Lua',
    },
    {
      value: 'Dart',
      label: 'Dart',
    },
    {
      value: 'PHP',
      label: 'PHP',
    },
  ];

  const [values, setValues] = useState({
    language: 'JavaScript',
    currentCode: '',
    toolboxCategories: null,
    runnableCode: '',
    currentLevel: {
      title: null,
      objective: null,
    },
    stepsEnabled: false, // Change when prod ready, it's annoying for development
    initialStep: 0,
    steps: [
      {
        element: '.step-one',
        intro: 'Build your solution using blocks',
        tooltipClass: classes.tooltip,
      },
      {
        element: '.step-two',
        intro: 'See the output code here',
        tooltipClass: classes.tooltip,
      },
      {
        element: '.step-three',
        intro: 'You can even change the language',
        tooltipClass: classes.tooltip,
      },
      {
        element: '.step-four',
        intro: 'Run or save for later',
        tooltipClass: classes.tooltip,
      },
    ],
  });

  const [open, setOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({ severity: '', message: '' });

  useEffect(() => {
    if (!values.toolboxCategories) {
      fetch('/api/blockly/initial')
        .then(res => res.text())
        .then((xml) => {
          setValues({ ...values, toolboxCategories: parseWorkspaceXml(xml) });
        });
    }
  });

  useEffect(() => {
    if (!values.currentLevel.title || !values.currentLevel.title) {
      fetch(`/api/levels/${id}`)
        .then((res) => {
          if (res.status !== 200) {
            history.push('/not-found');
          }
          return res.json();
        })
        .then((level) => {
          setValues({
            ...values,
            currentLevel: {
              title: level.name,
              objective: level.objective.title,
            },
          });
        });
    }
  });

  const handleSave = () => {
    const session = JSON.parse(localStorage.getItem('session'));
    fetch('/api/code', {
      method: 'POST',
      body: JSON.stringify({
        code: values.runnableCode,
        workspace: btoa(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(values.workspace))),
        userId: session.user_id,
        levelId: 1, // TODO: Get from route
      }),
      headers: {
        Authentication: session.token,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) throw new Error();
      res.json();
    })
      .then((res) => {
        setSnackbar({ severity: 'success', message: 'Code saved!' });
        setOpen(true);
      }).catch((err) => {
        setSnackbar({ severity: 'error', message: 'An error ocurred while saving the code' });
        setOpen(true);
      });
  };

  const regenCode = (language, workspace) => ({
    compiled: Blockly[language].workspaceToCode(workspace || values.workspace),
    runnable: Blockly.JavaScript.workspaceToCode(workspace || values.workspace),
  });

  const handleLanguageChange = (event) => {
    const newCode = regenCode(event.target.value);
    setValues({
      ...values,
      language: event.target.value,
      currentCode: newCode.compiled,
      runnableCode: newCode.runnable,
    });
  };

  const workspaceDidChange = (workspace) => {
    workspace.registerButtonCallback('myFirstButtonPressed', () => {
      alert('button is pressed');
    });
    const newCode = regenCode(values.language, workspace);
    setValues({
      ...values, workspace, currentCode: newCode.compiled, runnableCode: newCode.runnable,
    });
  };

  const runCode = () => {
    try {
      // eslint-disable-next-line no-eval
      eval(values.runnableCode);
    } catch (e) {
      setSnackbar({ severity: 'error', message: 'An error ocurred while running the code' });
      setOpen(true);
      alert(e);
    }
  };

  const onExit = () => {
    setValues({ ...values, stepsEnabled: false });
  };

  const Alert = alertProps => <MuiAlert elevation={6} variant="filled" {...alertProps} />;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Container className={classes.root} maxWidth={false}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Grid container direction="column" spacing={2}>
        <Steps
          enabled={values.stepsEnabled}
          steps={values.steps}
          initialStep={values.initialStep}
          onExit={onExit}
        />
        <Grid item id="levelNumber" sm={9} xs={12} className={classes.level}>
          <Typography variant="h1">{values.currentLevel.title}</Typography>
        </Grid>
        <Grid item id="objective" sm={9} xs={12}>
          <Typography variant="subtitle1">{values.currentLevel.objective}</Typography>
        </Grid>
        <Grid
          container
          item
          spacing={2}
        >
          <Grid xs={12} sm={9} item id="blockly" className={classes.blockly}>
            {values.toolboxCategories && (
            <ReactBlocklyComponent.BlocklyEditor
              toolboxCategories={values.toolboxCategories}
              workspaceConfiguration={{
                grid: {
                  spacing: 20,
                  length: 3,
                  colour: '#ccc',
                  snap: true,
                },
              }}
              initialXml={
                          '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>'
                      }
              wrapperDivClassName="fill-height"
              workspaceDidChange={workspaceDidChange}
              className="step-one"
            />
            )}
          </Grid>
          <Grid item xs={12} sm={3} id="theory" className={classes.theory}>
            <Paper className={classes.theory}>
              <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container item spacing={2} alignItems="center">
          <Grid item sm={3}>
            <TextField
              fullWidth
              label="Select Language"
              margin="dense"
              name="language"
              onChange={handleLanguageChange}
              select
              SelectProps={{ native: true }}
              value={values.language}
              variant="outlined"
              className="step-three"
            >
              {languages.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item container spacing={2} sm={9} className="step-four">
            <Grid item>
              <Button variant="contained" onClick={runCode}>
                Run!
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                onClick={handleSave}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SyntaxHighlighter
            language={values.language.toLowerCase()}
            style={darcula}
            showLineNumbers
            id="code"
            className="step-two"
          >
            {values.currentCode}
          </SyntaxHighlighter>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyBlockly;
