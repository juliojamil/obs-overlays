'use strict';

import {EventNotifyStore} from "./store.js";

const createNotifyInstance = (name) => {
    return EventNotifyStore.instance(name);
};

const destroyAll = () => {
    EventNotifyStore.destroy();
};

export const SimplyBuilderEvent = Object.freeze({
    instance: createNotifyInstance,
    destroy: destroyAll
});