// noinspection ExceptionCaughtLocallyJS

"use strict";

const setShadowFn = (data = {}) => {
    const {types, mode, styles, instance} = data;

    try {
        types.true(!!(instance));
        types.string(instance.instanceOf);
        types.true(instance.instanceOf === "SBObjectInterface");
        types.object(instance.object);

        types.string(mode);


        if (types.false(mode === "closed", true) && types.false(mode === "open", true)) {
            throw new Error(`${mode} is invalid type, valid types are: "open" and "closed".`);
        }

        if (styles) {
            types.string(styles);
            instance.object["shadow"] = {
                mode, styles
            };
        } else instance.object["shadow"] = mode;

    } catch (err) {
        console.error("Error on setShadowFn", err.message);
    }
    return instance;
};

export const setShadowMethod = Object.freeze(setShadowFn);