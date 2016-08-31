import React, { Component } from 'react';

export class Errormessage extends Component {

  render() {
    return(
      <div>
        { this.props.errorMessage }
      </div>
    )
  }
}