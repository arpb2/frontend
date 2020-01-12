/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactBlocklyComponent from 'react-blockly';
import Blockly from 'blockly';
import ConfigFiles from './initContent/content';
import parseWorkspaceXml from './BlocklyHelper';
import 'blockly/python';
import 'blockly/php';
import 'blockly/lua';
import 'blockly/javascript';
import 'blockly/dart';

export default class TestEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toolboxCategories: parseWorkspaceXml(
        ConfigFiles.INITIAL_TOOLBOX_XML,
      ),
      language: this.props.language,
      workspace: null,
    };
  }

  componentDidMount = () => {
  };

  workspaceDidChange = (workspace) => {
    const { language } = this.state;
    workspace.registerButtonCallback('myFirstButtonPressed', () => {
      alert('button is pressed');
    });
    const newXml = Blockly.Xml.domToText(
      Blockly.Xml.workspaceToDom(workspace),
    );
    document.getElementById('generated-xml').innerText = newXml;

    const code = Blockly[language].workspaceToCode(workspace);
    this.props.updateCode(code);
    this.setState({ workspace });
  };

  render = () => (
    <ReactBlocklyComponent.BlocklyEditor
      toolboxCategories={this.state.toolboxCategories}
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
      workspaceDidChange={this.workspaceDidChange}
    />
  )
}
