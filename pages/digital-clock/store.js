"use strict";

import {SimplyBuilderTypes} from "@simplybuilder/types-module/main.js";

const DigitalClockStore = {
    containerDateName: "date-container",
    mainElement: undefined,
    background: undefined
};

const githubVsVitejs = () => {
    const {href, port, pathname} = window.location;

    let url = href.replace(pathname, "");

    const checkPathName = pathname.split("digital-clock");

    if(checkPathName.length >= 2) {
        const path = removeLastSlash(checkPathName[0]);
        if(path.length >= 1) url = `${url}/${path}`;
    }

    return removeLastSlash(url);
};

const removeLastSlash = (url) => {
    return url.replace(/\/$/, '');
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
            let url = `${removeLastSlash(image_src)}`;
            if(SimplyBuilderTypes.true(url.startsWith("./"), true) || SimplyBuilderTypes.true(url.startsWith("/"), true)) {
                let path = url.replace(".", "").replace(/^\//, "");
                url = `${githubVsVitejs()}/${path}`;
            }

            DigitalClockStore.background.image_src = removeLastSlash(url.replace(/([^:]\/)\/+/g, '$1'));
        }

    }
};

const getJson = async () => {
    const address = githubVsVitejs();

    const url = `${address}/assets/digital-clock-panel/json/settings.json`;

    await fetch(url.replace(/([^:]\/)\/+/g, "$1"))
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