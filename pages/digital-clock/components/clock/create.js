"use strict";

import {SimplyBuilderCore} from "@simplybuilder/core-module/main.js";
import {utils} from "./utils.js";

const createContainerStruct = (store) => {
    const {SBObject, types} = SimplyBuilderCore;
    const struct = new SBObject().createHtml("section");
    const state = store.settings("containerDateName");
    struct.addAttr("class", "panel digital-clock");

    const background = store.settings("background");

    if(types.object(background, true)) {
        struct.addAttr("style", `--digitalClockBgImage: url('${background.image_src}/clock.png'); --digitalClockBgImageAfter: url('${background.image_src}/visor.png')`);
    }

    struct.setState(state.toString());
    return struct;
};

const createDivStruct = () =>  {
    const {SBObject} = SimplyBuilderCore;
    const struct = new SBObject().createHtml("div");

    struct.addAttr("class", "neon char-container");

    return struct;
};
const createSpanStruct = (content) =>  {
    const {SBObject} = SimplyBuilderCore;
    const struct = new SBObject().createHtml("span");
    const characters = content.split("");
    const parent = createDivStruct();
    for(let char of characters) {
        struct.setText(char.toString());
        struct.addAttr("class", "char");
        parent.addChild(struct);
    }

    return parent;
};

const createClockStructures = (store) => {
    //const {types} = SimplyBuilderCore;
    const {day, time} = utils.getDate();
    const container = createContainerStruct(store);

    const spanTime = createSpanStruct(time);
    const spanDay = createSpanStruct(day);

    return {
        container,
        time: spanTime.getObject(),
        day: spanDay.getObject()
    }
};

export const createSBObjects = Object.seal(createClockStructures);