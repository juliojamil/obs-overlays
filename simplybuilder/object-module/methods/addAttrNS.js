"use strict";

const addAttrNSFn = (data = {}) => {
    const {types, name, value, instance} = data;

    try {
        types.true(!!(instance));
        types.string(instance.instanceOf);
        types.true(instance.instanceOf === "SBObjectInterface");
        types.object(instance.object);
        types.string(name);
        types.string(value);

        if (types.undefined(instance.object.attrNS, true)) {
            instance.object.attrNS = {};
        }
        instance.object.attrNS[name] = value;

    } catch (err) {
        console.error("Error on addAttrNSFn", err.message);
    }
    return instance;
};

export const addAttrNSMethod = Object.freeze(addAttrNSFn);