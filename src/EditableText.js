import React, { Component } from 'react';

export class EditableText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            text: this.props.text
        }
    }

    enterEditMode() {
        this.setState({
            editMode: true
        })
    }

    leaveEditMode() {
        this.setState({
            editMode: false
        })
    }

    apply() {
        const newText = this.refs.inputElement.value;
        this.setState({
            text: newText,
            editMode: false
        });
        if (typeof this.props.textChanged === 'function') {
            this.props.textChanged(newText, this.props.text);
        }
    }

    keyDown(event) {
        // escape
        if (event.keyCode === 27) {
            this.leaveEditMode();
        }
        // enter
        if (event.keyCode === 13) {
            this.apply();
        }
    }

    componentDidUpdate() {
        if (this.refs.inputElement) {
            // Ugly hack: Sets the caret at the end of the text
            this.refs.inputElement.value = this.state.text
        }
    }

    render() {
        const TextMode =
            <span>
                {this.state.text}
                <button type="button" className="btn" onClick={ this.enterEditMode.bind(this) }>Edit</button>
            </span>
        const EditMode =
            <span>
                <input type="text"
                       autoFocus
                       selectionStart={ this.state.text.length }
                       defaultValue={ this.state.text }
                       ref="inputElement"
                       onKeyDown={ this.keyDown.bind(this) } />
                <button type="button" className="btn" onClick={ this.leaveEditMode.bind(this) }>Cancel</button>
                <button type="button" className="btn" onClick={ this.apply.bind(this) }>Apply</button>
            </span>
        return(
            <span>
                { this.state.editMode ? EditMode : TextMode }
            </span>
        )
    }

}