"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logo_1 = require("../../prints/logo");
const createString_1 = require("../utils/createString");
const request_1 = __importDefault(require("request"));
const __1 = __importDefault(require("../.."));
function default_1(rl) {
    console.clear();
    logo_1.logo();
    rl.question(createString_1.createString("Enter username"), (username) => {
        username = username.trim();
        rl.question(createString_1.createString("Enter password"), (password) => {
            password = password.trim();
            rl.question(createString_1.createString("Enter license key"), (key) => {
                request_1.default({
                    url: "https://disparity-nuker-api.0w218021.repl.co/create",
                    method: "POST",
                    json: {
                        Username: username,
                        Password: password,
                        KeyUsed: key,
                    },
                }, (err, res, body) => {
                    if (res.body.status === false) {
                        console.log(createString_1.createString(res.body.message, "semi", "fail"));
                        setTimeout(() => {
                            __1.default();
                        }, 1500);
                        return;
                    }
                    console.log(" ");
                    console.log(createString_1.createString("Created account!", "semi"));
                    setTimeout(() => {
                        __1.default();
                    }, 1000);
                });
            });
        });
    });
}
exports.default = default_1;
