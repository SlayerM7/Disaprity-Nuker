"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../../database/db"));
const request_1 = __importDefault(require("request"));
const createString_1 = require("../../../utils/createString");
const getTheme_1 = require("../../../utils/getTheme");
const sleep_1 = __importDefault(require("../../../utils/sleep"));
const menu_1 = __importDefault(require("../menu"));
function createRole(name, guildId, mainColor) {
    request_1.default({
        url: `https://discord.com/api/v8/guilds/${guildId}/roles`,
        method: "POST",
        headers: { Authorization: "Bot " + db_1.default.get("curtoken") },
        json: {
            reason: "External-nuker",
            name: name,
        },
    }, (err, res, body) => __awaiter(this, void 0, void 0, function* () {
        if (typeof res !== "undefined")
            if (typeof res.body !== "undefined") {
                if (res.body.message === "Missing Permissions") {
                    console.log(createString_1.createString(`Failed to create role`, "semi", "fail"));
                }
                else if (res.body.retry_after) {
                    console.log(createString_1.createString(`Rate limited`, "semi", "fail"));
                    yield sleep_1.default(res.body.retry_after * 1.05);
                    createRole(name, guildId, mainColor);
                }
                else {
                    console.log(createString_1.createString(`Created role`, "semi"));
                }
            }
            else {
                console.log(createString_1.createString(`Created role`, "semi"));
            }
    }));
}
function default_1(client, guildId, params = { amount: 10, name: "no-name-given" }, rl, server, goback = true) {
    let oldRoleSize = server.roles.cache.size;
    let mainColor = getTheme_1.getTheme();
    for (let i = 0; i < params.amount; i++) {
        createRole(params.name, guildId, mainColor);
        if (goback === true) {
            let checkChannels = setInterval(() => {
                if (server.roles.cache.size === oldRoleSize + params.amount) {
                    menu_1.default(client, rl);
                    clearInterval(checkChannels);
                }
            }, 1000);
        }
    }
}
exports.default = default_1;
