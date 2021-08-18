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
const logo_1 = require("../../../prints/logo");
const createString_1 = require("../../utils/createString");
const main_1 = __importDefault(require("../main"));
const changeToken_1 = __importDefault(require("./changeToken"));
const removeToken_1 = __importDefault(require("./removeToken"));
const tokenInfo_1 = __importDefault(require("./tokenInfo"));
const view_token_1 = __importDefault(require("./view-token"));
function menuToken(rl, client) {
    console.clear();
    logo_1.logo();
    logo_1.tokenMenuLogo();
    rl.question(createString_1.createString("Enter option"), (option) => __awaiter(this, void 0, void 0, function* () {
        if (option === "menu") {
            main_1.default(client, rl);
            return;
        }
        if (option === "1") {
            view_token_1.default(rl, client);
        }
        else if (option === "2") {
            changeToken_1.default(client, rl);
        }
        else if (option === "3") {
            tokenInfo_1.default(client, rl);
        }
        else if (option === "remove") {
            removeToken_1.default(client, rl).then(() => {
                console.log("tooo");
            });
        }
        else {
            menuToken(rl, client);
        }
    }));
}
exports.default = menuToken;
