"use strict";

import {createSBObjects} from "./create.js";
import {SimplyBuilderCore} from "@simplybuilder/core-module/main.js";

const updateSpanElements = (data = {}) => {
    const {parent, container} = data;
    const {dom} = SimplyBuilderCore;
    const {state} = container.getObject().dataset;

    if(parent.children.length >= 1) {
        const containerElement = dom.getElementFromStore(state);
        dom.removeElement(containerElement);
    }
    dom.createFromStruct({parent, struct: container.getObject()});

    return container;
};

const updateClockStructures = (store) => {
    const parent = store.settings("mainElement");
    const {container, time, day} = createSBObjects(store);

    container.addChild(day);
    container.addChild(time);

    return updateSpanElements({parent, container});
};

export const updateSBObjects = Object.seal(updateClockStructures);