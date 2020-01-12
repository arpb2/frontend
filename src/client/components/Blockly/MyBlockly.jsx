/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
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
  });

  const regenCode = (language, workspace) => Blockly[language].workspaceToCode(workspace || values.workspace);

  const handleLanguageChange = (event) => {
    setValues({
      ...values,
      language: event.target.value,
      currentCode: regenCode(event.target.value),
    });
  };

  const workspaceDidChange = (workspace) => {
    workspace.registerButtonCallback('myFirstButtonPressed', () => {
      alert('button is pressed');
    });
    setValues({ ...values, workspace, currentCode: regenCode(values.language, workspace) });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ height: '600px', width: '800px' }} id="blockly">
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
        </div>
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
      </div>
      <textarea
        readOnly
        id="code"
        style={{ height: '200px', width: '400px' }}
        value={values.currentCode}
      />
    </div>
  );
};

export default MyBlockly;
