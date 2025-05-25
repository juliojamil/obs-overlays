"use strict";

const setHtmlFn = (data = {}) => {
    const {types, content, instance} = data;

    try {
        types.true(!!(instance));
        types.string(instance.instanceOf);
        types.true(instance.instanceOf === "SBObjectInterface");
        types.object(instance.object);
        types.string(content);

        instance.object.html = content;

    } catch (err) {
        console.error("Error on setHtmlFn", err.message);
    }
    return instance;
};

export const setHtmlMethod = Object.freeze(setHtmlFn);