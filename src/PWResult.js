import React, { Component } from 'react';

export class Pwresult extends Component {

  render() {
    return(
      <div>
        <div className="pwg_password">
          {this.props.password}
        </div>
        <div className="text-center">
          <button type="button" className="btn pwg_password-copy-button" onClick={ this.props.showPasswordForm }>Back</button>
        </div>
      </div>
    )
  }
}