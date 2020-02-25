/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
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
import { Steps, Hints } from 'intro.js-react';
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
  outputCode: {
    marginTop: '8px',
  },
}));

const MyBlockly = (props) => {
  const {
    className, onChange, style, ...rest
  } = props;

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
    stepsEnabled: true,
    initialStep: 0,
    steps: [
      {
        element: '.step-one',
        intro: 'Hello step',
      },
      {
        element: '.step-two',
        intro: 'World step',
      },
    ],
    hintsEnabled: true,
    hints: [
      {
        element: '.step-one',
        hint: 'Hello hint',
        hintPosition: 'middle-right',
      },
    ],
  });

  useEffect(() => {
    if (!values.toolboxCategories) {
      fetch('/api/blockly/initial')
        .then(res => res.text())
        .then((xml) => {
          setValues({ ...values, toolboxCategories: parseWorkspaceXml(xml) });
        });
    }
  });

  const handleSave = () => {
    fetch('/api/code', {
      method: 'POST',
      body: JSON.stringify({
        code: values.runnableCode,
        workspace: btoa(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(values.workspace))),
        userId: JSON.parse(localStorage.getItem('session')).userId,
      }),
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
      alert(e);
    }
  };

  const onExit = () => {
    setValues({ ...values, stepsEnabled: false });
  };

  return (
    <div>
      <Steps
        enabled={values.stepsEnabled}
        steps={values.steps}
        initialStep={values.initialStep}
        onExit={onExit}
      />
      <Hints
        enabled={values.hintsEnabled}
        hints={values.hints}
      />
      <Grid container spacing={2} className={classes.root}>
        <Grid xs item id="blockly" className={classes.blockly}>
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
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={6} lg={3} xl={3}>
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
            >
              {languages.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid
            container
            spacing={2}
            justify="flex-end"
            alignItems="center"
          >
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
        <Grid container spacing={2} className={classes.outputCode}>
          <Grid item xs>
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
      </Grid>
    </div>
  );
};

export default MyBlockly;
