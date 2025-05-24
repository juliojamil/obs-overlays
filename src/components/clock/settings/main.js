"use strict";


import {clockSettingsFontValidate} from "./font.js";
import {clockSettingsPositionValidate} from "./position.js";
import {clockSettingsSizeValidate} from "./size.js";
import {clockSettingsBackgroundValidate} from "./background.js";

const validClockSettings = (clockStore) => {
    try {
        return !!(clockSettingsFontValidate(clockStore) && clockSettingsPositionValidate(clockStore)
            && clockSettingsSizeValidate(clockStore) && clockSettingsBackgroundValidate(clockStore));
    } catch (err) {
        console.error("Error on Clock Settings:", err.message);
    }
    return false;
};

const loadClockSettings = (data = {}, clockStore) => {
    const keys = ["background", "size", "position", "font"];

    try {
        return new Promise(done => {
            for (let i = (keys.length - 1); i >=0; i --) {
                const item = data[keys[i]];
                if (item && (Object.keys(item).length >= 1)) {
                    clockStore.settings[keys[i]] = item;
                }
                if(i === 0) return done(validClockSettings(clockStore));
            }
        });
    } catch (err) {
        console.warn(err.message);
        return false;
    }
};

const getClockSettings = async (url, clockStore) => {
    try {
        if(url && typeof url === "string") {
            const response = await fetch(url);
            if(response.ok) {
                clockStore.default = {...clockStore.settings};
                const json = await response.json();
                if (json && loadClockSettings(json, clockStore)) {
                    clockStore.default = undefined;
                    return true;
                }
            }
        }
    } catch (err) {
        console.error(err.message);
    }
    return false;
};

export const clockSettings = Object.seal(getClockSettings);