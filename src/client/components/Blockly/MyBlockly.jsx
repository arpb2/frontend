/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import ReactBlocklyComponent from 'react-blockly';
import Blockly from 'blockly';
import ConfigFiles from './initContent/content';
import parseWorkspaceXml from './BlocklyHelper';
import 'blockly/python';
import 'blockly/php';
import 'blockly/lua';
import 'blockly/javascript';
import 'blockly/dart';

const MyBlockly = (props) => {
  const {
    className, onChange, style, ...rest
  } = props;

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
    toolboxCategories: parseWorkspaceXml(
      ConfigFiles.INITIAL_TOOLBOX_XML,
    ),
    runnableCode: '',
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
      eval(values.runnableCode);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} style={{ height: '600px', width: '800px' }} id="blockly">
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
          initialXml={ConfigFiles.INITIAL_XML}
          wrapperDivClassName="fill-height"
          workspaceDidChange={workspaceDidChange}
        />
      </Grid>
      <Grid item xs={6}>
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
              style={{ flexBasis: '30%' }}
            >
              {languages.map(option => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={runCode}>Run!</Button>
          </Grid>
        </React.Fragment>
      </Grid>
      <Grid item xs={6}>
        <textarea
          readOnly
          id="code"
          style={{ height: '200px', width: '400px' }}
          value={values.currentCode}
        />
      </Grid>
    </Grid>
  );
};

export default MyBlockly;
