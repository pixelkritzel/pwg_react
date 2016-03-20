class Storage {
    get() {
        const storageContent = localStorage.getItem('pwg');
        return typeof storageContent === 'string' ? JSON.parse(storageContent) : storageContent;
    }

    set(services) {
        localStorage.setItem('pwg', JSON.stringify(services))
    }
}

class Services {
    constructor() {
        this.storage = new Storage();
        const services = this.storage.get() || [];
        this.services = services
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
}

const services = new Services();

export default services;