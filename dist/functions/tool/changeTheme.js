"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const db_1 = __importDefault(require("../../database/db"));
const logo_1 = require("../../prints/logo");
const createString_1 = require("../utils/createString");
const themes_1 = __importDefault(require("../utils/themes"));
const main_1 = __importDefault(require("./main"));
function changeTheme(client, rl) {
    console.clear();
    logo_1.logo();
    console.log(createString_1.createString("Type *view* to view themes", "semi"));
    console.log(" ");
    rl.question(createString_1.createString("Enter theme name"), (theme) => {
        theme = theme.toLowerCase();
        if (!themes_1.default.themeNames.includes(theme) && theme !== "view") {
            console.log("");
            console.log(createString_1.createString("Unknown theme", "semi", "fail"));
            setTimeout(() => {
                main_1.default(client, rl);
            }, 1500);
            return;
        }
        if (theme === "view") {
            console.clear();
            logo_1.logo();
            themes_1.default.themes.map((t) => {
                let mColor = t.theme;
                console.log(`              ${mColor("> ")}${chalk_1.white(t.themeName)} `);
            });
            setTimeout(() => {
                console.log(" ");
                rl.question(createString_1.createString("Type anything to continue"), () => {
                    changeTheme(client, rl);
                });
            }, 2000);
            return;
        }
        db_1.default.set("theme", theme);
        db_1.default.save();
        main_1.default(client, rl);
    });
}
exports.default = changeTheme;
