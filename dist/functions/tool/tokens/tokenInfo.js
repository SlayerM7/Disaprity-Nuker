"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logo_1 = require("../../../prints/logo");
const createString_1 = require("../../utils/createString");
const getTheme_1 = require("../../utils/getTheme");
const main_1 = __importDefault(require("../main"));
function tokenInfo(client, rl) {
    console.clear();
    logo_1.logo();
    let mainColor = getTheme_1.getTheme();
    console.log(createString_1.createString(`CLIENT INFO: `, "semi"));
    console.log(" ");
    console.log(createString_1.createString(`Total servers: ${client.guilds.cache.size}`, "semi"));
    console.log(createString_1.createString(`Total channels: ${client.channels.cache.size}`, "semi"));
    console.log(createString_1.createString(`Total emojis: ${client.emojis.cache.size}`, "semi"));
    console.log(createString_1.createString(`WS ping: ${client.ws.ping}`, "semi"));
    console.log(" ");
    rl.question(createString_1.createString("Type anything to continue"), () => {
        main_1.default(client, rl);
    });
}
exports.default = tokenInfo;
