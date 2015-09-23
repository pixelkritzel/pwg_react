import React, { Component } from 'react';
import generatePassword from './generatePassword'

export class Pwform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceName: "",
      salt: ""
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    var serviceName = React.findDOMNode(this.refs.serviceName).value;
    var salt = React.findDOMNode(this.refs.salt).value;
    var password = generatePassword(serviceName, salt);
    this.props.passwortGeneratedToggle(password);
  }

  render() {
    return(
      <form onSubmit={ this.handleFormSubmit.bind(this) } >
        <input type="text" value={ this.serviceName } ref="serviceName" />
        <input type="password" value={ this.salt }  ref="salt" />
        <button type="submit">Go!</button>
      </form>
    )
  }
}