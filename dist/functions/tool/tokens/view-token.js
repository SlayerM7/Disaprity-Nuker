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
const db_1 = __importDefault(require("../../../database/db"));
const logo_1 = require("../../../prints/logo");
const createString_1 = require("../../utils/createString");
const sleep_1 = __importDefault(require("../../utils/sleep"));
const main_1 = __importDefault(require("../main"));
function viewToken(rl, client) {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        logo_1.logo();
        let token = db_1.default.get("curtoken");
        let str = "";
        for (let letter of token) {
            yield sleep_1.default(63);
            str += letter;
            console.clear();
            logo_1.logo();
            console.log(createString_1.createString(str, "semi"));
            if (str.length === token.length) {
                console.log(" ");
                rl.question(createString_1.createString("Type anything to continue"), () => {
                    main_1.default(client, rl);
                });
            }
        }
    });
}
exports.default = viewToken;
