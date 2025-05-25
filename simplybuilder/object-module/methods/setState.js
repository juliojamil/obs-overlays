"use strict";

const setStateFn = (data = {}) => {
    const {types, name, instance} = data;

    try {
        types.true(!!(instance));
        types.string(instance.instanceOf);
        types.true(instance.instanceOf === "SBObjectInterface");
        types.object(instance.object);
        types.string(name);

        if (types.undefined(instance.object.dataset, true)) {
            instance.object.dataset = {};
        }
        instance.object.dataset["state"] = name;

    } catch (err) {
        console.error("Error on setStateFn", err.message);
    }
    return instance;
};

export const setStateMethod = Object.freeze(setStateFn);