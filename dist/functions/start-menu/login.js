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
const logo_1 = require("../../prints/logo");
const createString_1 = require("../utils/createString");
const discord_js_1 = require("discord.js");
const request_1 = __importDefault(require("request"));
const __1 = __importDefault(require("../.."));
const db_1 = __importDefault(require("../../database/db"));
const main_1 = __importDefault(require("../tool/main"));
const addToken_1 = __importDefault(require("../tool/tokens/addToken"));
function default_1(rl) {
    console.clear();
    logo_1.logo();
    rl.question(createString_1.createString("Enter username"), (username) => {
        username = username.trim();
        rl.question(createString_1.createString("Enter password"), (password) => {
            password = password.trim();
            request_1.default({
                url: "https://disparity-nuker-api.0w218021.repl.co/login",
                method: "POST",
                json: {
                    Username: username,
                    Password: password,
                },
            }, (err, res, body) => __awaiter(this, void 0, void 0, function* () {
                if (res.body.message === "That account does not exist.") {
                    console.log(" ");
                    console.log(createString_1.createString("Unknown account", "semi", "fail"));
                    setTimeout(() => {
                        __1.default();
                    }, 1000);
                    return;
                }
                if (res.body.message === "Incorrect password.") {
                    console.log(" ");
                    console.log(createString_1.createString("Incorrect password", "semi", "fail"));
                    setTimeout(() => {
                        __1.default();
                    }, 1000);
                    return;
                }
                if (res.body.message === "Exception fail") {
                    console.log(" ");
                    console.log(createString_1.createString("Unknown exception", "semi", "fail"));
                    setTimeout(() => {
                        __1.default();
                    }, 1000);
                    return;
                }
                if (!res.body) {
                    console.log(" ");
                    console.log(createString_1.createString("Please try again later", "semi", "fail"));
                    setTimeout(() => {
                        __1.default();
                    }, 1000);
                    return;
                }
                else if (res.body.status === false) {
                    console.log(" ");
                    console.log(createString_1.createString("Please try again later", "semi", "fail"));
                    setTimeout(() => {
                        console.log(res.body.message);
                    }, 1000);
                }
                let preTokenRes = res;
                request_1.default({
                    url: "https://disparity-nuker-api.0w218021.repl.co/gettoken",
                    method: "GET",
                    json: {
                        Authorization: res.body.message,
                    },
                }, (err, res, body) => {
                    const client = new discord_js_1.Client();
                    if (res.body.message === "No token has been added.") {
                        db_1.default.set("auth-code", preTokenRes.body.message);
                        console.clear();
                        logo_1.logo();
                        console.log(createString_1.createString("No token saved", "semi", "fail"));
                        console.log(" ");
                        rl.question(createString_1.createString("Enter token"), (token) => {
                            if (token === "menu") {
                                __1.default();
                                return;
                            }
                            client.on("ready", () => {
                                client.destroy();
                                console.log(" ");
                                addToken_1.default(client, rl, token).then(() => {
                                    // console.log("SUCCESS");
                                    __1.default();
                                });
                            });
                            client.login(token).catch(() => {
                                console.log(createString_1.createString("Invalid token", "semi", "fail"));
                                setTimeout(() => {
                                    __1.default();
                                }, 1000);
                            });
                        });
                        return;
                    }
                    db_1.default.set("auth-code", preTokenRes.body.message);
                    db_1.default.set("username", preTokenRes.body.username);
                    db_1.default.set("curtoken", res.body.message);
                    client.login(res.body.message);
                    main_1.default(client, rl);
                });
            }));
        });
    });
}
exports.default = default_1;
