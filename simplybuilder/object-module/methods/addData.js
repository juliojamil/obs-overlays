"use strict";

const addDataFn = (data = {}) => {
    const {types, name, value, instance} = data;

    try {
        types.true(!!(instance));
        types.string(instance.instanceOf);
        types.true(instance.instanceOf === "SBObjectInterface");
        types.object(instance.object);
        types.string(name);
        types.string(value);

        if (types.undefined(instance.object.dataset, true)) {
            instance.object.dataset = {};
        }
        instance.object.dataset[name] = value;

    } catch (err) {
        console.error("Error on addDataFn", err.message);
    }
    return instance;
};

export const addDataMethod = Object.freeze(addDataFn);