"use strict";

const addAttrFn = (data = {}) => {
    const {types, name, value, instance} = data;

    try {
        types.true(!!(instance));
        types.string(instance.instanceOf);
        types.true(instance.instanceOf === "SBObjectInterface");
        types.object(instance.object);
        types.string(name);
        types.string(value);

        if (types.undefined(instance.object.attr, true)) {
            instance.object.attr = {};
        }
        instance.object.attr[name] = value;

    } catch (err) {
        console.error("Error on addAttrFn", err.message);
    }
    return instance;
};

export const addAttrMethod = Object.freeze(addAttrFn);