import React, { Component } from 'react';
import generatePassword from './generatePassword';
import { Errormessage } from './Errormessage';

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
    var serviceName = React.findDOMNode(this.refs.serviceName).value.trim();
    var salt = React.findDOMNode(this.refs.salt).value.trim();
    var errorMessage;
    try {
      var password = generatePassword(serviceName, salt);
    } catch(error) {
      errorMessage = error.message
    }
    if (!errorMessage) {
      var password = generatePassword(serviceName, salt);
    } else {
      this.setState({
        errorMessage: errorMessage
      })
    }
  }

  componentWillUnmount(nextProps, nextState) {
    console.log(this.state)
  }

  render() {
    return(
      <form onSubmit={ this.handleFormSubmit.bind(this) } >
        <Errormessage errorMessage={ this.state.errorMessage }/>
        <input type="text" className="form-control pwg_input-service " value={ this.serviceName } placeholder="Service Name" ref="serviceName" />
        <input type="password" className="form-control pwg_input-phrase" placeholder="Secret Phrase" value={ this.salt }  ref="salt" />
        <div className="text-center">
          <button type="submit" className="btn">Go!</button>
        </div>
      </form>
    )
  }
}