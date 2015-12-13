import React, { Component } from 'react';
import generatePassword from './generatePassword';
import { Errormessage } from './Errormessage';
import { Autocomplete } from './Autocomplete';

export class Pwform extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.serviceName = '';
  }

  updateServiceName(serviceName) {
    this.serviceName = serviceName.trim();
  }

  focusSalt() {
    React.findDOMNode(this.refs.salt).focus();
  }

  getPassword() {
    var serviceName = this.serviceName;
    var salt = React.findDOMNode(this.refs.salt).value.trim();
    var errorMessage;
    try {
      var password = generatePassword(serviceName, salt);
    } catch(error) {
      errorMessage = error.message
    }
    if (!errorMessage) {
      this.props.passwordGenerated(password);
    } else {
      this.setState({
        errorMessage: errorMessage
      })
    }
  }

  saltKeyDownHandler(event) {
    if (event.keyCode === 13) {
      this.getPassword()
    }
  }

  render() {
    return(
      <div>
        <Errormessage errorMessage={ this.state.errorMessage }/>
        <Autocomplete onInput={ this.updateServiceName.bind(this) } onBlur={ this.focusSalt.bind(this) }  />
        <input type="text"
               className="form-control pwg_input-phrase"
               placeholder="Secret Phrase"
               value={ this.salt }
               ref="salt"
               onKeyDown={ this.saltKeyDownHandler.bind(this) } />
        <div className="text-center">
          <button type="submit" className="btn" onClick={ this.getPassword.bind(this) }>Go!</button>
        </div>
      </div>
    )
  }
}