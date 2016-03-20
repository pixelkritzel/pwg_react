import React, { Component } from 'react';
import { Pwform } from './PWForm';
import { Pwresult } from './PWResult';
import { ServiceList } from './ServiceList';

import './styles/style.scss';

export class Pwg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswortGenerated: false,
      displayPwg: true,
      displayServiceList: false,
      password: ''
    }
  }

  showPasswordForm(){
    var isPasswortGenerated = this.state.isPasswortGenerated;
    this.setState({
      password: '',
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

  switchView(event) {
    event.preventDefault();
    const newState = {
      displayPwg: !this.state.displayPwg,
      displayServiceList: !this.state.displayServiceList
    }
    this.setState(newState);
  }

  render() {
    let ActiveComponent
    if (this.state.displayPwg) {
      ActiveComponent = this.state.isPasswortGenerated ?
            <Pwresult password={ this.state.password } showPasswordForm={ this.showPasswordForm.bind(this) }/>
          : <Pwform passwordGenerated={ this.showPassword.bind(this) } />
    }
    if (this.state.displayServiceList) {
      ActiveComponent = <ServiceList />
    }
    return (
      <div className="pwg_selected-service-container">
        { ActiveComponent }
        <a href="#" onClick={ this.switchView.bind(this) } >
          { this.state.displayPwg ? 'Show Service List' : 'Show PWG'}
        </a>
      </div>
    );

  }
}