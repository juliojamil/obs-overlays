'use strict';

import {SimplyBuilderListener} from "../listener-module/main.js";
import {SimplyBuilderDom} from "../dom-module/main.js";
import {SimplyBuilderObject} from "../object-module/main.js";
import {SimplyBuilderTypes} from "../types-module/main.js";
import {SimplyBuilderAbstract} from "../abstract-module/main.js";
import {SimplyBuilderEvent} from "../event-module/main.js";

export const SimplyBuilderCore = Object.freeze({
    dom: SimplyBuilderDom,
    listen: SimplyBuilderListener,
    event: SimplyBuilderEvent,
    SBObject: SimplyBuilderObject,
    types: SimplyBuilderTypes,
    abstract: SimplyBuilderAbstract
});