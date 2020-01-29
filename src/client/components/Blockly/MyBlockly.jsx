/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import ReactBlocklyComponent from 'react-blockly';
import Blockly from 'blockly';
import { makeStyles } from '@material-ui/styles';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import lua from 'react-syntax-highlighter/dist/esm/languages/hljs/lua';
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
import dart from 'react-syntax-highlighter/dist/esm/languages/hljs/dart';
import darcula from 'react-syntax-highlighter/dist/esm/styles/hljs/darcula';
import parseWorkspaceXml from './BlocklyHelper';
import 'blockly/python';
import 'blockly/php';
import 'blockly/lua';
import 'blockly/javascript';
import 'blockly/dart';
import './blocks/custom/blocks';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('lua', lua);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('dart', dart);

const useStyles = makeStyles({
  blockly: {
    minHeight: '60vh',
  },
  outputCode: {
    height: '200px',
    width: '400px',
  },
});

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

  return (
    <Grid container spacing={2}>
      <Grid
        xs={12}
        md={12}
        lg={12}
        xl={12}
        item
        id="blockly"
        className={classes.blockly}
      >
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
            initialXml={'<xml xmlns="http://www.w3.org/1999/xhtml"></xml>'}
            wrapperDivClassName="fill-height"
            workspaceDidChange={workspaceDidChange}
          />
        )}
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <React.Fragment>
          <Grid item xs={4}>
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
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Button variant="contained" onClick={runCode}>
                          Run!
            </Button>
          </Grid>
        </React.Fragment>
      </Grid>
      <Grid item xs={12} md={12} lg={12} xl={12}>
        <SyntaxHighlighter
          language={values.language.toLowerCase()}
          style={darcula}
          showLineNumbers
          id="code"
        >
          {values.currentCode}
        </SyntaxHighlighter>
      </Grid>
    </Grid>
  );
};

export default MyBlockly;
