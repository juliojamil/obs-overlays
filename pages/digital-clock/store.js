"use strict";

import {SimplyBuilderTypes} from "@simplybuilder/types-module/main.js";

const DigitalClockStore = {
    containerDateName: "date-container",
    mainElement: undefined,
    background: undefined
};

const validJson = (data = {}) => {
    const {json} = data;
    if(SimplyBuilderTypes.object(json?.["panels"]?.["digital-clock"]?.["background"], true)) {
        const {color, image_src} = json["panels"]["digital-clock"]["background"];
        if(SimplyBuilderTypes.undefined(DigitalClockStore.background, true)) {
            DigitalClockStore.background = {
                color: "transparent",
                image_src: undefined
            };
        }
        if(SimplyBuilderTypes.string(color, true)
            && SimplyBuilderTypes.false(color === DigitalClockStore.background.color, true)) {
            DigitalClockStore.background.color = color;
        }
        if(SimplyBuilderTypes.string(image_src, true)
            && SimplyBuilderTypes.false(image_src === DigitalClockStore.background.image_src, true)) {
            let url = `${image_src}`;
            const getPort = window.location.port;
            if(SimplyBuilderTypes.true(Number(getPort) === 3000, true) && url.startsWith("./")) url = url.replace("./", "/");

            DigitalClockStore.background.image_src = url.replace(/([^:]\/)\/+/g, '$1')
                .replace(/\/$/, '');
        }

    }
};

const getJson = async () => {
    const {origin, href, port} = window.location;
    const getPort = port;
    let host = href;
    if(SimplyBuilderTypes.true(Number(port) === 3000, true)) host = origin;
    console.log(window.location);

    const url = `${host}/assets/digital-clock-panel/json/settings.json`;
    await fetch(url.replace(/([^:]\/)\/+/g, '$1'))
        .then(res => {
            if(res.ok) return res.json();
        }).then((json) => validJson({json, origin}))
        .catch(console.error);
};

const getSettings = (key) => {
    return DigitalClockStore[key];
};
const setMainElement = (parent) => {
    DigitalClockStore.mainElement = parent;
};

window.document.addEventListener("DOMContentLoaded", getJson);

export const PanelDigitalClockStore = Object.seal({
    settings: getSettings,
    setMainElement
});