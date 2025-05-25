"use strict";

const addChildFn = (data = {}) => {
    const {types, child, instance} = data;
    let children = {type: "html", element: "div"};
    try {
        types.true(!!(instance));
        types.string(instance.instanceOf);
        types.true(instance.instanceOf === "SBObjectInterface");
        types.object(instance.object);

        if (types.object(child, true) || types.string(child, true)) {
            if (types.string(child, true)) {
                try {
                    const parse = JSON.parse(child);
                    if (types.object(parse, true)) children = parse;
                } catch {
                }
            } else children = child;
        } else {
            if (child.instanceOf && child.instanceOf === "SBObjectInterface") children = child.getObject();
        }

        types.object(children);
        types.string(children.type);
        types.string(children.element);

        if (types.undefined(instance.object.children, true)) {
            instance.object.children = [];
        }

        instance.object.children[instance.object.children.length] = children;

    } catch (err) {
        console.error("Error on addChildFn", err.message);
    }
    return instance;
};

export const addChildMethod = Object.freeze(addChildFn);