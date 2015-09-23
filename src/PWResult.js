import React, { Component } from 'react';

export class Pwresult extends Component {

  render() {
    return(
      <div>
        Your Password
        {this.props.password}
        <button type="button" onClick={ this.props.showPasswordForm }>Back</button>
      </div>
    )
  }
}