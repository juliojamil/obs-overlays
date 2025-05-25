"use strict";

import {SimplyBuilderAbstract} from "../abstract-module/main.js";

const SimplyBuilderAbstractInstance = SimplyBuilderAbstract.instance;

class SBTypesInterface extends SimplyBuilderAbstractInstance {
    constructor() {
        super();
    }

    _typeError(expected, received) {
        return new TypeError(`Expected a ${expected}, but received: ${JSON.stringify(received)}. Type of provided value: ${typeof received}`);
    }

    string(value, boolean = false) {
        if (typeof value === "string") return true;
        if (boolean) return false;
        throw this._typeError("string", value);
    }

    null(value, boolean = false) {
        if (typeof value === "object" && value === null) return true;
        if (boolean) return false;
        throw this._typeError("null", value);
    }

    undefined(value, boolean = false) {
        if (typeof value === "undefined") return true;
        if (boolean) return false;
        throw this._typeError("undefined", value);
    }

    boolean(value, boolean = false) {
        if (typeof value === "boolean") return true;
        if (boolean) return false;
        throw this._typeError("boolean", value);
    }

    true(value, boolean = false) {
        if (typeof value === "boolean" && value === true) return true;
        if (boolean) return false;
        throw this._typeError("boolean true", value);
    }

    false(value, boolean = false) {
        if (typeof value === "boolean" && value === false) return true;
        if (boolean) return false;
        throw this._typeError("boolean false", value);
    }

    array(value, boolean = false) {
        if (typeof value === "object" && Array.isArray(value)) return true;
        if (boolean) return false;
        throw this._typeError("array", value);
    }

    object(value, boolean = false) {
        if (typeof value === "object" && !Array.isArray(value)
            && value !== null && Object.getPrototypeOf(value) === Object.prototype) return true;
        if (boolean) return false;
        throw this._typeError("object", value);
    }

    class(value, boolean = false) {
        if (typeof value === "function" && (/^\s*class\s+/.test(value.toString()))) return true;
        if (boolean) return false;
        throw this._typeError("class", value);
    }

    number(value, boolean = false) {
        if (typeof value === "number" && (!isNaN(value))) return true;
        if (boolean) return false;
        throw this._typeError("number", value);
    }
}

export const SimplyBuilderTypes = Object.freeze( new SBTypesInterface());