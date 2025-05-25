"use strict";

const _reset = (instance) => {
    try {
        const keys = [
            "type", "element",
            "attr", "attrNS", "dataset", "listen",
            "text", "html", "shadow", "children"
        ];

        for (let key of keys) {
            instance.object[key] = undefined;
        }
        return true;
    } catch (err) {
        console.error("fail on load_reset:", err.message);
    }
    return false;
};
const _check = (data = {}) => {
    const {request, types} = data;
    if (types.false(types.string(request.type, true), true) || types.false(types.string(request.element, true), true)) return false;
};
const _populuate = (data = {}) => {
    const {request = {}, instance} = data;
    const keys = Object.keys(request);

    if (keys.length >= 2 && _reset(instance)) {
        for (let key of keys) {
            instance.object[key] = request[key];
        }
    }
    return true;
};

const loadFn = (data = {}) => {
    const {types, load, instance} = data;

    try {
        types.true(!!(instance));
        types.true(!!(load));
        types.string(instance.instanceOf);
        types.true(instance.instanceOf === "SBObjectInterface");
        types.object(instance.object);
        types.object(load);

        _check({request: load, types});
        _populuate({request: load, instance});
        _check({request: instance.object, types});

        return true;
    } catch (err) {
        console.error("Error on loadFn", err.message);
    }
    return false
};

export const loadMethod = Object.freeze(loadFn);