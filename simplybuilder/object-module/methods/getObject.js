"use strict";

const getObjectFn = (data = {}) => {
    const {types, instance} = data;
    let output = {type: "html", element: "div"};

    try {
        types.true(!!(instance));
        types.string(instance.instanceOf);
        types.true(instance.instanceOf === "SBObjectInterface");
        types.object(instance.object);

        output = JSON.parse(JSON.stringify(instance.object));
    } catch (err) {
        console.error("Error on getObjectFn", err.message);
    }
    return Object.freeze(output);
};

export const getObjectMethod = Object.freeze(getObjectFn);