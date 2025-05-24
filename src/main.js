// noinspection JSUnresolvedReference

"use strict";

import "@styles/main.scss";
import {DomModule} from "@jamilservices/sb-core-dom-module";
import {clockPanel} from "./panes/clock/main.js";

const start = () => {
    clockPanel.start();
    /*const parent = document.getElementById("app");

    DomModule.createFromStruct({parent, struct: clockPanel.boxStruct()});
    const boxClockPanel =  DomModule.getElementFromStore("clock.box");

    if(boxClockPanel) clockPanel.clockUpdate(boxClockPanel, DomModule);*/
};

window.document.addEventListener("DOMContentLoaded", start);