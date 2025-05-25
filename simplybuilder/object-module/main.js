"use strict";

import {SimplyBuilderAbstract} from "../abstract-module/main.js";
import {SimplyBuilderTypes} from "../types-module/main.js";

import {SBOMethods} from "./methods/main.js";

const methods = SBOMethods(SimplyBuilderTypes);

const SimplyBuilderAbstractInstance = SimplyBuilderAbstract.instance;

const sbObjectSchema = {
    type: "html",
    element: undefined,
    attr: undefined,
    attrNS: undefined,
    dataset: undefined,
    listen: undefined,
    text: undefined,
    html: undefined,
    shadow: undefined,
    children: undefined
};
Object.freeze(sbObjectSchema);

const banner = "Methods available in the Simply Builder Object interface:";
const availableMethods = [
    "addAttr", "addAttrNS", "addChild", "addData", "addListen",
    "setText", "setHtml", "setShadow", "setState",
    "createHtml", "createSvg",
    "load", "getJson", "getObject", "info"
];
Object.seal(availableMethods);
const internalMethods = ["instanceOf"];
Object.seal(internalMethods);

class SBObjectInterface extends SimplyBuilderAbstractInstance {
    constructor() {
        super();
        this.object = {};
        this.created = false;
        Object.defineProperty(this, 'object', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: Object.assign({}, sbObjectSchema)
        });
    }

    addAttr(name, value) {
        const instance = this;
        return methods.addAttr({name, value, instance});
    }

    addAttrNS(name, value) {
        const instance = this;
        return methods.addAttrNS({name, value, instance});
    }

    addChild(child) {
        const instance = this;
        return methods.addChild({child, instance});
    }

    addData(name, value) {
        const instance = this;
        return methods.addData({name, value, instance});
    }

    addListen(listen, action) {
        const instance = this;
        return methods.addListen({listen, action, instance});
    }

    setText(content) {
        const instance = this;
        return methods.setText({content, instance});
    }

    setHtml(content) {
        const instance = this;
        return methods.setHtml({content, instance});
    }

    setShadow(mode = "open", styles) {
        const instance = this;
        return methods.setShadow({mode, styles, instance});
    }

    setState(name) {
        const instance = this;
        return methods.setState({name, instance});
    }

    createHtml(element) {
        if (this.created) throw new Error("Object has already been created");
        const instance = this;
        return methods.createElement({instance, type: "html", element});
    }

    createSvg(element) {
        if (this.created) throw new Error("Object has already been created");
        const instance = this;
        return methods.createElement({instance, type: "svg", element});
    }

    load(data = {}) {
        const instance = this;
        const response = methods.load({load: data, instance});
        SimplyBuilderTypes.instance().true(response);
        this.created = true;
        return this;
    }

    getJson() {
        const instance = this;
        return methods.getJson({instance});
    }

    getObject() {
        const instance = this;
        return methods.getObject({instance});
    }

    info() {
        const methods = [...availableMethods, ...internalMethods];
        console.info(`\n${banner}\n ${methods.join(", ")}.\n`);
        return methods;
    }
}


export const SimplyBuilderObject = Object.freeze(SBObjectInterface);