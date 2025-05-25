"use strict";

class SBAbstractInterface {
    constructor() {
        this.instanceOf = "";
        /**
         * @function
         */
        this.setAbstract = () => {
        };
        Object.defineProperty(this, 'instanceOf', {
            enumerable: false,
            configurable: false,
            value: new.target.name
        });
        Object.defineProperty(this, 'setAbstract', {
            enumerable: false,
            configurable: false,
            value: (target) => {
                if (this.constructor === target) {
                    throw new Error(`Cannot instantiate abstract class ${this.constructor.name} directly.`);
                }
            }
        });
        Object.freeze(this.instanceOf);
        Object.freeze(this.setAbstract);
        this.setAbstract(SBAbstractInterface);
    }
}

Object.defineProperty(SBAbstractInterface, Symbol.hasInstance, {
    get: () => (instance) => {
        return (instance.constructor.name === instance.instanceOf);
    }
});

export const SimplyBuilderAbstractInterface = Object.freeze(SBAbstractInterface);