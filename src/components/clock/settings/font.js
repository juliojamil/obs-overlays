"use strict";

const validClockFontSettings = (clockStore) => {
    const {font} = clockStore.settings;
    const keys = ["family", "size", "style", "weight", "color"];
    try {
        if(typeof font === "undefined") clockStore.settings.font = {};

        for (let key of keys) {
            const item = clockStore.settings.font[key];
            if (!item || typeof item !== "string") clockStore.settings.font[key] = clockStore.default.font[key];
        }
        return true;
    } catch (err) {
        console.error("Error validating 'font' settings", err.message);
    }
    return false;
};

export const clockSettingsFontValidate = Object.seal(validClockFontSettings);