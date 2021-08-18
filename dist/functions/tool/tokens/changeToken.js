"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../database/db"));
const logo_1 = require("../../../prints/logo");
const createString_1 = require("../../utils/createString");
const main_1 = __importDefault(require("../main"));
const removeToken_1 = __importDefault(require("./removeToken"));
const addToken_1 = __importDefault(require("./addToken"));
const __1 = __importDefault(require("../../.."));
function changeToken(client, rl) {
    console.clear();
    logo_1.logo();
    rl.question(createString_1.createString("Enter new token"), (token) => {
        if (token === "menu") {
            main_1.default(client, rl);
            return;
        }
        console.clear();
        logo_1.logo();
        // console.log(createString("Checking token ...", "semi"));
        // client.destroy();
        // client.login(token).catch(() => {
        //   console.log(" ");
        //   console.log(createString("Invalid token", "semi", "fail"));
        //   setTimeout(() => {
        //     console.clear();
        //     logo();
        //     console.log(
        //       createString("Critical error, Please restart tool", "semi", "fail")
        //     );
        //   }, 4000);
        // });
        removeToken_1.default(client, rl).then(() => {
            addToken_1.default(client, rl, token).then(() => {
                db_1.default.delete("auth-code");
                db_1.default.delete("curtoken");
                db_1.default.delete("username");
                __1.default();
            });
        });
    });
}
exports.default = changeToken;
