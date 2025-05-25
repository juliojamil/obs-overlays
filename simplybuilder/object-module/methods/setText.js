"use strict";

const setTextFn = (data = {}) => {
    const {types, content, instance} = data;

    try {
        types.true(!!(instance));
        types.string(instance.instanceOf);
        types.true(instance.instanceOf === "SBObjectInterface");
        types.object(instance.object);
        types.string(content);

        instance.object.text = content;

    } catch (err) {
        console.error("Error on setTextFn", err.message);
    }
    return instance;
};

export const setTextMethod = Object.freeze(setTextFn);