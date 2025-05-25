'use strict';

const notifyInitSymbol = Symbol('Init');
const notifyInstanceSymbol = Symbol("Instance");

const EventTargetStore = {};
const EventListenerStore = {};

const NotifyInstanceStore = {
    [notifyInstanceSymbol]: {}
}

const isValidString = (str) => {
    return typeof str === "string" && str.trim().length >= 1;
};

const registerEvent = (name) => {
    if (isValidString(name)) {
        if (EventTargetStore[name]) {
            throw new Error("event already exists");
        }
        EventTargetStore[name] = new EventTarget();
        EventListenerStore[name] = new Map();

        return true;
    } else throw new Error("event name must be string");
};

const checkIfExist = (name) => {
    if (isValidString(name)) return (EventListenerStore[name] && EventTargetStore[name]);
    return false;
}

const addListenerOnEvent = (data = {}) => {
    const {instance, callback = {}} = data;
    if (instance?.instanceOf === "SimplyBuilderEventNotifyStoreInterface" && checkIfExist(instance.event)) {
        const {id, fn} = callback;
        if (isValidString(id) && typeof fn === "function") {
            if (EventListenerStore[instance.event].has(id)) {
                throw new Error("listener id already exists");
            }
            EventListenerStore[instance.event].set(id, (event) => {
                fn(event.detail);
            });
            EventTargetStore[instance.event].addEventListener(instance.event, EventListenerStore[instance.event].get(id));
        }
    }
};

const removeListenerFromEvent = (data = {}) => {
    const {instance, id} = data;
    const {event} = instance;
    if (instance?.instanceOf === "SimplyBuilderEventNotifyStoreInterface" && checkIfExist(instance.event)) {
        if (isValidString(id) && (EventListenerStore[instance.event].has(id))) {
            EventTargetStore[instance.event].removeEventListener(instance.event, EventListenerStore[instance.event].get(id));
            EventListenerStore[instance.event].delete(id);
            return true;
        }
    } else {
        console.warn(`removeEventListener Warning: No listener found with id '${id}' for event '${event}'.`);
    }

    return false;
};

const registerNotifyInstance = (instance) => {
    if (checkIfExist(instance.event)) {
        const {event} = instance;
        NotifyInstanceStore[notifyInstanceSymbol][event] = instance;
    }
}

class SimplyBuilderEventNotifyStoreInterface {
    constructor(name) {
        Object.defineProperty(this, 'instanceOf', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: new.target.name
        });
        Object.defineProperty(this, 'toObject', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: () => {
                return {...this};
            }
        });
        Object.defineProperty(this, 'toString', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: () => {
                return JSON.stringify(this.toObject());
            }
        });
        Object.defineProperty(this, 'immutable', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: () => {
                if (!Object.isFrozen(this)) {
                    Object.freeze(this);
                }
                return true;
            }
        });
        if (isValidString(name)) {
            this[notifyInitSymbol]("ev-" + name.toString().trim());
        }
    }

    /**
     * Initializes a new event registration.
     *
     * @private
     * @param {string} name - The name of the event to initialize.
     */
    [notifyInitSymbol](name) {
        if (registerEvent(name)) {
            this.event = name;
        }
    }

    /**
     * Subscribes a listener to this instance's event.
     *
     * @param {Object} data - The listener configuration.
     */
    subscribe(data = {}) {
        const instance = this;
        addListenerOnEvent({instance, callback: data});
    }

    /**
     * Unsubscribes a listener from this instance's event using its ID.
     *
     * @param {string} id - The ID of the listener to remove.
     * @returns {boolean} True if the listener is unsubscribed.
     */
    unsubscribe(id) {
        const instance = this;
        return removeListenerFromEvent({instance, id});
    }

    /**
     * Emits an event with the provided data.
     *
     * @param {Object} data - The data to emit with the event.
     */
    emit(data = {}) {
        const instance = this;
        const customEvent = new CustomEvent(instance.event, {
            detail: data
        });
        EventTargetStore[instance.event].dispatchEvent(customEvent);
    }
}

Object.defineProperty(SimplyBuilderEventNotifyStoreInterface, Symbol.hasInstance, {
    get: () => (instance) => instance.constructor.name === instance.instanceOf
});

const getNotifyInstance = (name) => {
    const event = "ev-" + name;
    if (isValidString(name) && checkIfExist(event) && NotifyInstanceStore[notifyInstanceSymbol][event]) {
        return NotifyInstanceStore[notifyInstanceSymbol][event];
    }
    return undefined;
}

const createInstance = (name) => {
    let instance = getNotifyInstance(name);
    if (typeof instance === "undefined") instance = new SimplyBuilderEventNotifyStoreInterface(name);
    instance.immutable();
    registerNotifyInstance(instance);
    return instance;
};

const destroyInstance = (name) => {
    if (checkIfExist(name) && NotifyInstanceStore[notifyInstanceSymbol][name]) {
        const listeners = Array.from(EventListenerStore[name].keys());
        if (listeners.length >= 1) {
            for (let i = (listeners.length - 1); i >= 0; i--) {
                const item = listeners[i];
                if (item) NotifyInstanceStore[notifyInstanceSymbol][name].unsubscribe(item);
            }
        }
        EventListenerStore[name].clear();
        delete EventListenerStore[name];
        delete EventTargetStore[name];
        delete NotifyInstanceStore[notifyInstanceSymbol][name];
    }
};

const destroyStore = () => {
    const instances = Object.keys(NotifyInstanceStore[notifyInstanceSymbol]);
    if (instances.length >= 1) {
        for (let i = (instances.length - 1); i >= 0; i--) {
            const item = instances[i];
            if (item) destroyInstance(item);
        }
    }
    return true;
};

export const EventNotifyStore = Object.freeze({
    instance: createInstance,
    destroy: destroyStore
});