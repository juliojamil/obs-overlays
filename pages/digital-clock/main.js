// noinspection JSUnresolvedReference

"use strict";

import "@styles/digital-clock/main.scss";
import {PanelDigitalClockStore} from "./store.js";
import {Panel} from "./components/clock/main.js";

const start = () => {
    const mainElement = window.document.getElementById("widget");
    PanelDigitalClockStore.setMainElement(mainElement);
    const clock = new Panel(PanelDigitalClockStore);
    clock.test();
};

window.document.addEventListener("DOMContentLoaded", start);