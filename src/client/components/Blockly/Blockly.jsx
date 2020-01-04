import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TestEditor from '../../views_old/Blockly/TestEditor';

const Blockly = (props) => {
  const {
    className, onChange, style, ...rest
  } = props;

  useEffect(() => {
    window.addEventListener('load', () => {
      const editor = React.createElement(TestEditor);
      ReactDOM.render(editor, document.getElementById('blockly'));
    });
  });
  return (
    <div>
      <div
        style={{ height: '600px', width: '800px' }}
        id="blockly"
      />
      <pre id="generated-xml" />
      <textarea
        readOnly
        id="code"
        style={{ height: '200px', width: '400px' }}
        value=""
      />
      <TestEditor />
    </div>
  );
};

export default Blockly;
