"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const db_1 = __importDefault(require("../../../database/db"));
function removeToken(client, rl) {
    return new Promise((resolve, reject) => {
        request_1.default({
            url: "https://disparity-nuker-api.0w218021.repl.co/deletetoken",
            method: "POST",
            json: {
                Authorization: db_1.default.get("auth-code"),
            },
        }, (err, res, body) => {
            if (res.body.status === true)
                resolve(void 0);
            if (res.body.status === false)
                reject(void 0);
        });
    });
}
exports.default = removeToken;
