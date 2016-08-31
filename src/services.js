import { observable } from 'mobx';

class Storage {
    get() {
        const storageContent = localStorage.getItem('pwg');
        return typeof storageContent === 'string' ? JSON.parse(storageContent) : storageContent;
    }

    set(services) {
        localStorage.setItem('pwg', JSON.stringify(services));
    }
}

class Services {
    @observable services = null;

    constructor() {
        this.storage = new Storage();
        const services = this.storage.get() || [];
        this.services = services;
    }

    addService(serviceName) {
        if ( !this.services.some(service => service.name === serviceName) ) {
            this.services.push({ name: serviceName })
            this.storage.set(this.services);
        } else {
            throw new Error('Service already defined!');
        }
        return this.services;
    }

    getServices () {
        return this.services;
    }

    updateServiceName (oldName, newName) {
        const service = this.services.find( service => service.name === oldName)
        if (service) {
            service.name = newName;
            this.storage.set(this.services);
        } else {
            throw new Error(`old service name ${oldName} is unknown!`)
        }
        return this.services;
    }

    deleteService(name) {
        const serviceIndex = this.services.findIndex( service => service.name === name);
        if (serviceIndex > -1) {
            this.services.splice(serviceIndex, 1);
            this.storage.set(this.services);
        } else {
            throw new Error(`Couldn't delete service ${name}  because it is unknown!`)
        }
        return this.services;
    }
}

const services = new Services();

export default services;