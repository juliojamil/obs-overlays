"use strict";

const createFn = (data = {}) => {
    const {types, type, element, instance} = data;

    try {
        types.true(!!(instance));
        types.string(instance.instanceOf);
        types.true(instance.instanceOf === "SBObjectInterface");
        types.object(instance.object);

        types.string(type);
        types.string(element);

        if (types.true(type === "html", true) || types.true(type === "svg", true)) {
            instance.object["type"] = type;
            instance.object["element"] = element;
            instance.created = true;
        }

    } catch (err) {
        console.error("Error on createFn", err.message);
    }

    return instance;
};

export const createMethod = Object.freeze(createFn);