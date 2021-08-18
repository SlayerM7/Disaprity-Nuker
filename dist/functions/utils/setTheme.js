"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const chalk_1 = require("chalk");
const themes = [
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
        theme: chalk_1.magenta,
    },
    {
        themeName: "magenta",
        theme: chalk_1.magenta,
    },
    {
        themeName: "magenta bright",
        theme: chalk_1.magentaBright,
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
const themeNames = themes.map((obj) => obj.themeName);
function setTheme(client, rl, theme) {
    return new Promise((resolve, reject) => {
        if (!themeNames.includes(theme)) {
            reject("Theme is not supported");
        }
        request_1.default({
            url: "",
        });
    });
}
exports.default = setTheme;
