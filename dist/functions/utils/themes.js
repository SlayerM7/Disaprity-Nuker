"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
let themes = [
    {
        themeName: "red",
        theme: chalk_1.red,
    },
    {
        themeName: "red bright",
        theme: chalk_1.redBright,
    },
    {
        themeName: "green",
        theme: chalk_1.green,
    },
    {
        themeName: "green bright",
        theme: chalk_1.greenBright,
    },
    {
        themeName: "yellow",
        theme: chalk_1.yellow,
    },
    {
        themeName: "yellow bright",
        theme: chalk_1.yellowBright,
    },
    {
        themeName: "default",
        theme: chalk_1.magentaBright,
    },
    {
        themeName: "magenta",
        theme: chalk_1.magenta,
    },
    {
        themeName: "blue",
        theme: chalk_1.blue,
    },
    {
        themeName: "blue bright",
        theme: chalk_1.blueBright,
    },
    {
        themeName: "grey",
        theme: chalk_1.grey,
    },
    {
        themeName: "cyan",
        theme: chalk_1.cyan,
    },
    {
        themeName: "cyan bright",
        theme: chalk_1.cyanBright,
    },
];
let themesObject = {
    themes,
    themeNames: themes.map((obj) => obj.themeName),
};
exports.default = themesObject;
