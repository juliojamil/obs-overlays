"use strict";

const validClockSizeSettings = (clockStore) => {
    const {size} = clockStore.settings;
    const keys = ["width", "height"];
    try {
        if(typeof size === "undefined") clockStore.settings.size = {};

        for (let key of keys) {
            const item = clockStore.settings.size[key];
            if (!item || typeof item !== "string") clockStore.settings.size[key] = clockStore.default.size[key];
        }
        return true;
    } catch (err) {
        console.error("Error validating 'size' settings", err.message);
    }
    return false;
};

export const clockSettingsSizeValidate = Object.seal(validClockSizeSettings);