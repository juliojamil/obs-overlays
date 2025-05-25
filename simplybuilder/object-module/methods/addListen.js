// noinspection ExceptionCaughtLocallyJS

"use strict";

const addListenFn = (data = {}) => {
    const {types, listen, action, instance} = data;

    try {
        types.true(!!(instance));
        types.string(instance.instanceOf);
        types.true(instance.instanceOf === "SBObjectInterface");
        types.object(instance.object);

        types.string(listen);
        types.string(action);

        if (types.undefined(instance.object.listen, true)) {
            instance.object.listen = {};
        }
        if (types.string(instance.object.listen.action, true)) throw new Error("Listener has already been created");

        instance.object.listen[action] = listen;

    } catch (err) {
        console.error("Error on addListenFn", err.message);
    }
    return instance;
};

export const addListenMethod = Object.freeze(addListenFn);