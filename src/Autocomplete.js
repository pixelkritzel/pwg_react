import React, { Component } from 'react';
import services from './services';

export class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: services.getServices()
    };
  }

  exportValue(event) {
    const value = React.findDOMNode(this.refs.inputField).value;
    this.props.updateServiceName(value);
  }

  showList() {
    this.setState({ shouldListRender: true });
  }

  hideList(event) {
    this.setState({
      shouldListRender: false
    });
  }

  navigate(event) {
    const services = this.state.services;
    const newState = {services: services};
    const highlightIndex = services.findIndex((item) => item.highlight)
    highlightIndex !== -1 ? services[highlightIndex].highlight = false : null;
    // escape
    if (event.keyCode === 27) {
      this.hideList();
    }
    // enter
    if (event.keyCode === 13) {
      const input = React.findDOMNode(this.refs.inputField);
      if (highlightIndex !== -1) {
        const serviceName = services[highlightIndex].name;
        input.value = serviceName;
        this.props.updateServiceName(serviceName);
      }
      input.blur();
      this.props.onBlur();
    }
    // arrow up
    if (event.keyCode === 38) {
      if (highlightIndex !== 0 && highlightIndex !== -1) {
        services[highlightIndex - 1].highlight = true;
        this.props.updateServiceName(services[highlightIndex - 1].name);
      } else {
        services[services.length - 1].highlight = true;
        this.props.updateServiceName(services[services.length - 1].name);
      }
    }
    // arrow down
    else if (event.keyCode === 40) {
      if(highlightIndex !== services.length - 1 && highlightIndex !== -1) {
        services[highlightIndex + 1].highlight = true;
        this.props.updateServiceName(services[highlightIndex + 1].name);
      } else {
        services[0].highlight = true;
        this.props.updateServiceName(services[0].name);
      }
    }
    this.setState(newState);
  }

  filterItems(event) {
    // don't filter list if kex event was arrow up or down
    if (event.keyCode === 38 || event.keyCode === 40) return;
    const filterText = React.findDOMNode(this.refs.inputField).value.trim();
    const filteredItems = services.getServices().filter((item) => item.name.includes(filterText));
    this.setState({ services: filteredItems });
  }

  setServiceName(event) {
    this.props.updateServiceName(event.target.innerText);
  }

  addServiceName() {
    let newServices;
    try {
      newServices = services.addService(this.props.serviceName)
    } catch(error) {
      alert(error);
    }
    if (newServices) {
      this.setState({
        services: newServices
      });
    }

  }

  renderList() {
    return (
      <ul className="autocomplete-dropdown">
        { this.state.services.map((item, index) =>
          <li className={ item.highlight ? 'autocomplete-highlight' : null }
              onMouseDown={ this.setServiceName.bind(this) }
              onTouchStart={ this.setServiceName.bind(this) }>
            { item.name }
          </li> )
        }
      </ul>
    )
  }

  render() {
    return (
      <div className="autocomplete">
        <div className="input-group">
          <input type="text"
                 className="form-control autocomplete-service-name-input"
                 value={ this.props.serviceName }
                 placeholder="Service Name"
                 ref="inputField"
                 onInput={ this.exportValue.bind(this) }
                 onFocus={ this.showList.bind(this) }
                 onClick={ this.showList.bind(this) }
                 onBlur={ this.hideList.bind(this) }
                 onKeyDown={ this.navigate.bind(this) }
                 onKeyUp={ this.filterItems.bind(this) }
                 />
          <button className="form-control autocomplete-add-service-name"
                  type="button"
                  onClick={ this.addServiceName.bind(this) } >+</button>
        </div>
        { this.state.shouldListRender ? this.renderList() : void 0 }
      </div>
    )
  }
}