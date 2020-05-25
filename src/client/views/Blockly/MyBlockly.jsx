/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import {
  TextField, Button, ButtonGroup, Grid, Typography, Paper, Container, Snackbar,
} from '@material-ui/core';
import ReactBlockly from 'react-blockly';
import Blockly from 'blockly';
import { makeStyles } from '@material-ui/styles';
import SaveIcon from '@material-ui/icons/Save';
import BuildIcon from '@material-ui/icons/Build';
import SendIcon from '@material-ui/icons/Send';
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
    stepsEnabled: false, // TODO: Change when prod ready, it's annoying for development
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
    fetch('/api/blockly/initial')
      .then(res => res.text())
      .then((xml) => {
        setValues(v => ({ ...v, toolboxCategories: parseWorkspaceXml(xml) }));
      });
  }, []);

  useEffect(() => {
    fetch(`/api/levels/${id}`)
      .then((res) => {
        if (res.status !== 200) {
          history.push('/not-found');
        }
        return res.json();
      })
      .then((level) => {
        setValues(v => ({
          ...v,
          currentLevel: {
            title: level.name,
            objective: level.objective.title,
          },
        }));
      });
  }, [values.currentLevel.title, history, id]);

  const [runLink, setRunLink] = useState('');
  const [codeWasBuilt, setCodeWasBuilt] = useState(false);


  const handleSave = () => {
    const workspace = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(values.workspace));
    const session = JSON.parse(localStorage.getItem('session'));
    fetch('/api/code', {
      method: 'POST',
      body: JSON.stringify({
        code: values.runnableCode,
        workspace: btoa(workspace),
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
    setCodeWasBuilt(false);
    const newCode = regenCode(values.language, workspace);
    setValues({
      ...values, workspace, currentCode: newCode.compiled, runnableCode: newCode.runnable,
    });
  };

  const buildCode = () => {
    const url = new URL('uniwebview://arpb2');
    try {
      // const workspace = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(values.workspace));
      // messaging.sendCodeToApp(btoa(workspace));
      eval(values.runnableCode);
    } catch (e) {
      setSnackbar({ severity: 'error', message: 'An error ocurred while running the code' });
      setOpen(true);
    }
    const result = url.toString();
    console.log(result);
    setRunLink(result);
    setCodeWasBuilt(true);
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
            <ReactBlockly.BlocklyEditor
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
            <ButtonGroup variant="contained" aria-label="ARPB2 control btn group">
              <Button
                onClick={handleSave}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
              <Button onClick={buildCode} startIcon={<BuildIcon />}>
                Build
              </Button>
              <Button
                disabled={!codeWasBuilt}
                href={runLink}
                startIcon={<SendIcon />}
              >
                Run
              </Button>
              <Button
                href="uniwebview://arpb2action=move_forward&amp;?action=rotate_left&amp;action=move_forward"
              >
                Mock
              </Button>
            </ButtonGroup>
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
