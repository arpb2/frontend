/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactBlocklyComponent from 'react-blockly';
import Blockly from 'blockly';
import ConfigFiles from './initContent/content';
import parseWorkspaceXml from './BlocklyHelper';
import 'blockly/python';

export default class TestEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolboxCategories: parseWorkspaceXml(
        ConfigFiles.INITIAL_TOOLBOX_XML,
      ),
    };
  }

    componentDidMount = () => {
      window.setTimeout(() => {
        this.setState({
          toolboxCategories: this.state.toolboxCategories.concat([
            {
              name: 'Text2',
              blocks: [
                { type: 'text' },
                {
                  type: 'text_print',
                  values: {
                    TEXT: {
                      type: 'text',
                      shadow: true,
                      fields: {
                        TEXT: 'abc',
                      },
                    },
                  },
                },
              ],
            },
          ]),
        });
      }, 2000);
    };

    workspaceDidChange = (workspace) => {
      workspace.registerButtonCallback('myFirstButtonPressed', () => {
        alert('button is pressed');
      });
      const newXml = Blockly.Xml.domToText(
        Blockly.Xml.workspaceToDom(workspace),
      );
      document.getElementById('generated-xml').innerText = newXml;

      console.log(Blockly);

      const code = Blockly.Python.workspaceToCode(workspace);
      document.getElementById('code').value = code;
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
    );
}
