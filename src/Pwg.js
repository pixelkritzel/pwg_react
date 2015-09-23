import React, { Component } from 'react';
import { Pwform } from './PWForm';
import { Pwresult } from './PWResult';

export class Pwg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswortGenerated: false,
      password: ''
    }
  }

  showPasswordForm(){
    var isPasswortGenerated = this.state.isPasswortGenerated;
    this.setState({
      password: "",
      isPasswortGenerated: !isPasswortGenerated
    });
  }

  showPassword(password) {
    var isPasswortGenerated = this.state.isPasswortGenerated;
    this.setState({
      password: password,
      isPasswortGenerated: !isPasswortGenerated
    });
  }

  render() {
    return (
      <div>
        { this.state.isPasswortGenerated ?
          <Pwresult password={ this.state.password } showPasswordForm={ this.showPasswordForm.bind(this) }/>
        : <Pwform passwortGeneratedToggle={ this.showPassword.bind(this) } /> }
      </div>
    );
  }
}