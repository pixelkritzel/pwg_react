import React, { Component } from 'react';

const items = [{
  title: 'abc'
},{
  title: 'bcd'
},{
  title: 'cde'
},{
  title: 'def'
},{
  title: 'efg'
}]

export class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: items
    };
  }

  exportValue(event) {
    const value = React.findDOMNode(this.refs.inputField).value;
    this.props.onInput(value);
  }

  showList() {
    this.setState({ shouldListRender: true });
  }

  hideList() {
    this.setState({
      shouldListRender: false
    });
  }

  navigate(event) {
    let items = this.state.items;
    const highlightIndex = items.findIndex((item) => item.highlight)
    highlightIndex !== -1 ? items[highlightIndex].highlight = false : null;
    // escape
    if (event.keyCode === 27) {
      this.hideList();
    }
    // enter
    if (event.keyCode === 13) {
      const input = React.findDOMNode(this.refs.inputField);
      if (highlightIndex !== -1) {
        const serviceName = items[highlightIndex].title;
        input.value = serviceName;
        this.props.onInput(serviceName);
      }
      input.blur();
      this.props.onBlur();
    }
    // arrow up
    if (event.keyCode === 38) {
      highlightIndex !== 0 && highlightIndex !== -1 ?
        items[highlightIndex - 1].highlight = true
      : items[items.length - 1].highlight = true;
    }
    // arrow down
    else if (event.keyCode === 40) {
      highlightIndex !== items.length - 1 && highlightIndex !== -1 ?
        items[highlightIndex + 1].highlight = true
      : items[0].highlight = true;
    }
    this.setState({items: items});
  }

  filterItems() {
    const filterText = React.findDOMNode(this.refs.inputField).value.trim();
    const filteredItems = items.filter((item) => item.title.includes(filterText));
    this.setState({ items: filteredItems });
  }

  renderList() {
    return (
      <ul>
        { this.state.items.map((item) => <li>
          { item.title }
          { item.highlight ? ' highlight' : null }
          </li> )
        }
      </ul>
    )
  }

  render() {
    return (
      <div>
        <input type="text"
               className="form-control pwg_input-service"
               value={ this.serviceName }
               placeholder="Service Name"
               ref="inputField"
               onInput={ this.exportValue.bind(this) }
               onFocus={ this.showList.bind(this) }
               onClick={ this.showList.bind(this) }
               onBlur={ this.hideList.bind(this) }
               onKeyDown={ this.navigate.bind(this) }
               onKeyUp={ this.filterItems.bind(this) }
               />
        { this.state.shouldListRender ? this.renderList() : void 0 }
      </div>
    )
  }
}