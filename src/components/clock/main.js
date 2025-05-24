"use strict";

import {clockSettingsBackgroundValidate} from "./settings/background.js";
import {clockSettingsSizeValidate} from "./settings/size.js";
import {clockSettingsPositionValidate} from "./settings/position.js";
import {clockSettingsFontValidate} from "./settings/font.js";
import {clockSettings} from "./settings/main.js";
import {clockWidget} from "@components/clock/widget/main.js";

const clockStore = {
    settings: {
        background: {
            image: "/assets/png/clock.png",
            position: "left top",
            size: "100% 100%",
            repeat: "no-repeat"
        },
        size: {
            width: "324px",
            height: "200px"
        },
        position: {
            top: "160px",
            left: "unset",
            bottom: "unset",
            right: "4px"
        },
        font: {
            family: "DS-Digital",
            size: "52px",
            style: "normal",
            weight: "600",
            color: "#07090a"
        }
    },
    default: undefined
};

const startClockPanel = () => {
    const {href} = window.location;
    const testUrl = `${href}/assets/json/clock.json`;
    if(clockSettings(testUrl, clockStore).then()) return clockWidget(clockStore);
};

export const clockPanel = Object.seal({
    start: startClockPanel
})