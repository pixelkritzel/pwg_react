import React, { Component } from 'react';
import { ServiceListItem } from './ServiceListItem';
import {observer} from "mobx-react"
import services from './services';

@observer export class ServiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: services.getServices()
        }
    }

    render() {
        this.state.services.forEach( service => console.log(service.name));
        return(
            <ul className="service-list">
                { this.state.services.map(service =>
                    <ServiceListItem name={ service.name } key={service.name} />
                ) }
            </ul>
        )
    }
}