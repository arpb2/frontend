import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import TestEditor from './TestEditor';

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
    editorCreated: false,
    currentCode: '',
  });

  useEffect(() => {
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(`current code: ${values.currentCode}`);
  };

  const updateCode = (currentCode) => {
    setValues({ ...values, currentCode });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ height: '600px', width: '800px' }} id="blockly">
          <TestEditor updateCode={updateCode} language={values.language} regenCode={false} />
        </div>
        <TextField
          fullWidth
          label="Select Language"
          margin="dense"
          name="language"
          onChange={handleChange}
          select
          SelectProps={{ native: true }}
          value={values.language}
          variant="outlined"
          style={{ flexBasis: '30%' }}
          defaultValue="JavaScript"
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
      <pre id="generated-xml" />
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
