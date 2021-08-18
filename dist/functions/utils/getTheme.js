"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTheme = void 0;
const chalk_1 = require("chalk");
const db_1 = __importDefault(require("../../database/db"));
const themes_1 = __importDefault(require("./themes"));
function getTheme() {
    if (db_1.default.has("theme")) {
        let themeName = db_1.default.get("theme");
        let theme = themes_1.default.themes.find((obj) => obj.themeName === themeName);
        // while (true) {
        //   console.log(theme.theme);
        // }
        return theme.theme;
    }
    else
        return chalk_1.magentaBright;
}
exports.getTheme = getTheme;
