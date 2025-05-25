'use strict';

import store from "./store.js";
import component from "./component/main.js";

import {SimplyBuilderListener} from "../listener-module/main.js";
const {addElementToStore, getElementFromStore} = store;

const removeElementFromStore = (key, mode = 1) => {
    if (mode === 1 && SimplyBuilderListener) return store.removeElementFromStore({key, mode, SimplyBuilderListener});
    return store.removeElementFromStore({key, mode: 2});
};

const createHTMLElement = (data = {}) => {
    // noinspection JSCheckFunctionSignatures
    return component.createHTMLElement({
        ...data,
        DomStore: {addElementToStore, getElementFromStore}
    });
};

const createSVGElement = (data = {}) => {
    // noinspection JSCheckFunctionSignatures
    return component.createSVGElement({
        ...data,
        DomStore: {addElementToStore, getElementFromStore}
    });
};

const createChildren = (data) => {
    const {struct, element} = data;
    if (struct.children) {
        const startFromLast = struct.children["toReversed"]();
        for (let i = (startFromLast.length - 1); i >= 0; i--) {
            const childItem = startFromLast[i];
            if (childItem) createFromStruct({struct: childItem, parent: element});
        }
    }
};

const TypeSelect = (type) => {
    try {
        if (type && type === "svg") return createSVGElement;
        return createHTMLElement;
    } catch (err) {
        console.error(err);
        return undefined;
    }
};

const createEventElement = (data) => {
    const {struct = {}, element} = data;

    if ((struct.event?.action && struct.event?.type)
        && SimplyBuilderListener?.EventActions[struct.event.action.toString()]) {
        const eventStoreSchema = {
            element,
            type: struct.event.type.toString(),
            handler: SimplyBuilderListener?.EventActions[struct.event.action.toString()]
        };
        if (struct.event.node) eventStoreSchema['nodeId'] = struct.event.node;
        SimplyBuilderListener?.addEventToStore(eventStoreSchema);
    }
};

const createFromStruct = (data) => {
    try {
        if (typeof data === "object") {
            const {struct, parent = document.body} = data;
            if (!struct?.element) return false;
            let typeStruct = "html";
            if (struct.type && struct.type.toString().trim().length >= 1) typeStruct = struct.type.toString().trim();
            const el = TypeSelect(typeStruct.toLowerCase())({
                parent,
                shadow: struct['shadow'],
                element: {
                    type: struct.element,
                    attr: Object.entries(struct.attr || {}).map(([name, value]) => ({name, value})),
                    attrNS: Object.entries(struct.attrNS || {}).map(([name, value]) => ({name, value})),
                    dataset: Object.entries(struct.dataset || {}).map(([name, value]) => ({name, value}))
                }
            });

            if (struct["text"]) el.textContent = struct["text"];
            if (struct["html"]) el.innerHTML = struct["html"];
            createEventElement({struct, element: el});
            createChildren({struct, element: el});
            return true;
        }
    } catch (err) {
        console.error(err);
    }
    return false;
};

const removeElementFromStoreOrEvents = (element) => {
    try {
        if (element.dataset?.state) {
            removeElementFromStore(element.dataset.state);
            return true;
        }
        if (typeof SimplyBuilderListener.removeAllEventsFromStore === "function") {
            SimplyBuilderListener.removeAllEventsFromStore(element);
            return true;
        }
    } catch {
    }
    return false;
};

const removeElement = (element) => {
    removeElementFromStoreOrEvents(element);
    const elementsWithEvent = element.querySelectorAll('[listener="true"]');
    if (elementsWithEvent.length >= 1) {
        for (let i = (elementsWithEvent.length - 1); i >= 0; i--) {
            const item = elementsWithEvent[i];
            if (item) removeElementFromStoreOrEvents(item);
        }
    }
    const elementsWithoutEvent = element.querySelectorAll('[data-state]');
    if (elementsWithoutEvent.length >= 1) {
        for (let i = (elementsWithoutEvent.length - 1); i >= 0; i--) {
            const item = elementsWithoutEvent[i];
            if (item) removeElementFromStoreOrEvents(item);
        }
    }
    element.remove();
};

export const SimplyBuilderDom = Object.freeze({
    createHTMLElement, createSVGElement,
    addElementToStore, getElementFromStore,
    removeElementFromStore,
    createFromStruct, removeElement
});