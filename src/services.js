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
    constructor() {
        this.storage = new Storage();
        const services = this.storage.get() || [];
        this.services = services;
        this.callbacks = [];
    }

    addService(serviceName) {
        if ( !this.services.some(service => service.name === serviceName) ) {
            this.services.push({ name: serviceName })
            this.storage.set(this.services);
            this.runCallbacks('add');
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
            this.runCallbacks('update');
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
            this.runCallbacks('delete');
        } else {
            throw new Error(`Couldn't delete service ${name}  because it is unknown!`)
        }
        return this.services;
    }

    addCallback( callback ) {
        return this.callbacks[this.callbacks.push(callback) - 1];
    }

    runCallbacks(action) {
        this.callbacks.forEach(callback => {
            if (typeof callback === 'function') {
                callback(this.services, action)
            }
        })
    }

    removeCallback(removingCallback) {
        const callbackIndex = this.callbacks.findIndex(callback => callback == removingCallback);
        this.callbacks.splice(callbackIndex, 1);
        removingCallback.bind(null);
    }
}

const services = new Services();

export default services;