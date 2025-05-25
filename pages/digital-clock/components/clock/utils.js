"use strict";

const padTo2Digits = (num) => {
    return String(num).padStart(2, "0");
};

const dateFormat = () => {
    const now = new Date();
    const getDate = padTo2Digits(now.getDate());
    const getMonth = padTo2Digits((now.getMonth() + 1));
    const getFullYear = now.getFullYear();

    const getHours = padTo2Digits(now.getHours());
    const getMinutes = padTo2Digits(now.getMinutes());
    const getSeconds = padTo2Digits(now.getSeconds());

    const time = `${getHours}:${getMinutes}:${getSeconds}`;
    const day = `${getDate}/${getMonth}/${getFullYear}`;

    return {time, day};
};

export const utils = Object.seal({
    getDate: dateFormat
});