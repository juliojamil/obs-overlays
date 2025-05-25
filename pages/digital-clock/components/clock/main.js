"use strict";

import {createSBObjects} from "./create.js";
import {updateSBObjects} from "./update.js";

class DigitalClockOverlayPanelInterface {
    constructor(store = {}) {
        this.store = store;
        this.update = this.update.bind(this);
    }
    create(){
        createSBObjects(this.store);
        return this;
    }
    update(){
        updateSBObjects(this.store);
        setTimeout(this.update, 500);
        return this;
    }
    start(){
        this.create();
        setTimeout(this.update, 500);
    }
    test(){
        this.start();
    }
}

export const Panel = Object.seal(DigitalClockOverlayPanelInterface);