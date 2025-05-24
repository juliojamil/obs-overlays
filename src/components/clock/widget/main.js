"use strict";

import {DomModule} from "@jamilservices/sb-core-dom-module";

const panelBoxStruct = (clockStore) => {
    const {background, size, position} = clockStore.settings;
    /*const {clockDate, clockTime} = getClockData();
    const clockDateStruct = createTextSpan({text: clockDate, clock: true});
    const clockTimeStruct = createTextSpan({text: clockTime, clock: true});*/

    return {
        element: "div",
        attr: {
            class: "panel",
            style: `background-image: url("${background.image}"); background-repeat: ${background.repeat};
            background-size: ${background.size}; background-attachment: local;background-position: ${background.position}; 
            inline-size: ${size.width}; block-size: ${size.height};
            top: ${position.top}; left: ${position.left}; bottom: ${position.bottom}; right: ${position.right}`
        },
        dataset: {
            state: "clock.box"
        },
        children: [
      //      clockDateStruct,
        //    clockTimeStruct
        ]
    };
};

const clockWidgetStart = (clockStore) => {
    const struct = panelBoxStruct(clockStore);
    const parent = document.getElementById("app");

    DomModule["createFromStruct"]({parent, struct});
};

export const clockWidget = Object.seal(clockWidgetStart);