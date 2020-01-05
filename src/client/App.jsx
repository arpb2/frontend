import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    return (
      <div>
        <div style={{ height: '600px', width: '800px' }} id="blockly" />
        <pre id="generated-xml" />
        <textarea readOnly id="code" style={{ height: '200px', width: '400px' }} value="" />
      </div>
    );
  }
}
