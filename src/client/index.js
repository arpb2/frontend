import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TestEditor from './TestEditor';

ReactDOM.render(<App />, document.getElementById('root'));

window.addEventListener('load', () => {
  const editor = React.createElement(TestEditor);
  ReactDOM.render(editor, document.getElementById('blockly'));
});
