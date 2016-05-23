import React, { Component } from 'react';
import { ServiceListItem } from './ServiceListItem';
import services from './services';

export class ServiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: services.getServices()
        }
        this.servicesCallback = services.addCallback( this.updateServiceList.bind(this) );
    }

    componentWillUnmount() {
        services.removeCallback(this.servicesCallback);
    }

    updateServiceList(newServices, action) {
        this.setState({
            services: newServices.concat([])
        });
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