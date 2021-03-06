/* globals document alert */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function copyToClipboard(pwInput) {
    pwInput.select();
    try {
      // copy text
      document.execCommand('copy');
      pwInput.blur();
    }
    catch (err) {
        alert('please press Ctrl/Cmd+C to copy');
    }
}

export class Pwresult extends Component {


  componentDidMount() {
    copyToClipboard(ReactDOM.findDOMNode(this.refs.pw));
  }

  render() {
    return(
      <div>
        <input type="text" readOnly className="pwg_password" ref="pw" value={this.props.password } />
        <div className="text-center">
          <button type="button" className="btn pwg_password-copy-button" onClick={ this.props.showPasswordForm }>Back</button>
        </div>
      </div>
    )
  }
}