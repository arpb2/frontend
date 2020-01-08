import React, { useEffect } from 'react';
import Blockly from 'blockly';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TestEditor from './TestEditor';
import ConfigFiles from './initContent/content';


const MyBlockly = (props) => {
  const {
    className, onChange, style, ...rest
  } = props;

  useEffect(() => {
  //   window.addEventListener('load', () => {
  //     const editor = React.createElement(TestEditor);
  //     ReactDOM.render(editor, document.getElementById('blockly'));
  //   });
    const workspace = Blockly.inject('blocklyDiv', {
      toolbox: ConfigFiles.INITIAL_TOOLBOX_XML,
    });
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xml_text = Blockly.Xml.domToPrettyText(xml);
    console.log(xml_text);
  });

  return (
    <div>
      {/* <TestEditor />
      <div style={{ height: '600px', width: '800px' }} id="blockly" />
      <pre id="generated-xml" />
      <textarea
        readOnly
        id="code"
        style={{ height: '200px', width: '400px' }}
        value=""
      /> */}
      <div id="blocklyDiv" style={{ height: '480px', width: '600px' }} />
    </div>
  );
};

export default MyBlockly;
