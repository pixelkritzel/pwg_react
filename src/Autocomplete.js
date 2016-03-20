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
    const items = this.state.items;
    const newState = {items: items};
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
      if (highlightIndex !== 0 && highlightIndex !== -1) {
        items[highlightIndex - 1].highlight = true;
        this.props.onInput(items[highlightIndex - 1].title);
      } else {
        items[items.length - 1].highlight = true;
        this.props.onInput(items[items.length - 1].title);
      }
    }
    // arrow down
    else if (event.keyCode === 40) {
      if(highlightIndex !== items.length - 1 && highlightIndex !== -1) {
        items[highlightIndex + 1].highlight = true;
        this.props.onInput(items[highlightIndex + 1].title);
      } else {
        items[0].highlight = true;
        this.props.onInput(items[0].title);
      }
    }
    this.setState(newState);
  }

  filterItems(event) {
    // don't filter list if kex event was arrow up or down
    if (event.keyCode === 38 || event.keyCode === 40) return;
    const filterText = React.findDOMNode(this.refs.inputField).value.trim();
    const filteredItems = items.filter((item) => item.title.includes(filterText));
    this.setState({ items: filteredItems });
  }

  renderList() {
    return (
      <ul className="autocomplete-dropdown">
        { this.state.items.map((item) => <li className={ item.highlight ? 'autocomplete-highlight' : null }>
          { item.title }
          </li> )
        }
      </ul>
    )
  }

  render() {
    return (
      <div className="autocomplete">
        <input type="text"
               className="form-control"
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
        { this.state.shouldListRender ? this.renderList() : void 0 }
      </div>
    )
  }
}