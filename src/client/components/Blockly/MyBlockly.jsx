import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import TestEditor from './TestEditor';


const MyBlockly = (props) => {
  const {
    className, onChange, style, ...rest
  } = props;

  useEffect(() => {
    const editor = React.createElement(TestEditor);
    ReactDOM.render(editor, document.getElementById('blockly'));
  });

  return (
    <div>
      <TestEditor />
      <div style={{ height: '600px', width: '800px' }} id="blockly" />
      <pre id="generated-xml" />
      <textarea
        readOnly
        id="code"
        style={{ height: '200px', width: '400px' }}
        value=""
      />
    </div>
  );
};

export default MyBlockly;
