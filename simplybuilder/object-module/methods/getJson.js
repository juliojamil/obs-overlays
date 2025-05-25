"use strict";

const getJsonFn = (data = {}) => {
    const {types, instance} = data;
    let output = "";
    try {
        types.true(!!(instance));
        types.string(instance.instanceOf);
        types.true(instance.instanceOf === "SBObjectInterface");
        types.object(instance.object);
        output = JSON.stringify(instance.object);
    } catch (err) {
        console.error("Error on getJsonFn", err.message);
    }
    return Object.freeze(output);
};

export const getJsonMethod = Object.freeze(getJsonFn);