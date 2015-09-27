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
        <input type="text" className="form-control pwg_input-service " value={ this.serviceName } placeholder="Service Name" ref="serviceName" />
        <input type="password" className="form-control pwg_input-phrase" placeholder="Secret Phrase" value={ this.salt }  ref="salt" />
        <div className="text-center">
          <button type="submit" className="btn">Go!</button>
        </div>
      </form>
    )
  }
}