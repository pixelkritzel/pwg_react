import React, { Component } from 'react';
import { EditableText } from './EditableText';
import services from './services';

export class ServiceListItem extends Component {

    updateServiceName(newName, oldName) {
        const newServices = services.updateServiceName(oldName, newName);
    }

    deleteService() {
        services.deleteService(this.props.name);
    }

    render() {
        return(
            <li className="service-list_item">
                <button type="button" className="btn" onClick={ this.deleteService.bind(this) } >Delete</button>
                <EditableText text={ this.props.name } textChanged={ this.updateServiceName.bind(this) } />
            </li>
        )
    }
}