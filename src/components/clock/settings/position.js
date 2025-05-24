"use strict";

const validClockPositionSettings = (clockStore) => {
    const {position} = clockStore.settings;
    const keys = ["top", "left", "right", "bottom"];
    try {
        if(typeof position === "undefined") clockStore.settings.position = {};

        for (let key of keys) {
            const item = clockStore.settings.position[key];
            if (!item || typeof item !== "string") clockStore.settings.position[key] = clockStore.default.position[key];
        }
        return true;
    } catch (err) {
        console.error("Error validating 'position' settings", err.message);
    }
    return false;
};

export const clockSettingsPositionValidate = Object.seal(validClockPositionSettings);