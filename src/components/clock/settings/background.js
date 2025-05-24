"use strict";

const validClockBackgroundSettings = (clockStore) => {
    const {background} = clockStore.settings;
    const keys = ["image", "position", "size", "repeat"];
    try {
        if(typeof background === "undefined") clockStore.settings.background = {};

        for (let key of keys) {
            const item = clockStore.settings.background[key];
            if (!item || typeof item !== "string") clockStore.settings.background[key] = clockStore.default.background[key];
        }
        return true;
    } catch (err) {
        console.error("Error validating 'background' settings", err.message);
    }
    return false;
};

export const clockSettingsBackgroundValidate = Object.seal(validClockBackgroundSettings);