"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./database/db"));
const readline_1 = __importDefault(require("readline"));
const createString_1 = require("./functions/utils/createString");
const logo_1 = require("./prints/logo");
const login_1 = __importDefault(require("./functions/start-menu/login"));
const register_1 = __importDefault(require("./functions/start-menu/register"));
const child_process_1 = __importDefault(require("child_process"));
const request_1 = __importDefault(require("request"));
const open_1 = __importDefault(require("open"));
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function toolStart() {
    db_1.default.delete("username");
    db_1.default.delete("curtoken");
    db_1.default.delete("auth-code");
    db_1.default.save();
    child_process_1.default.exec("mode 85,20");
    console.clear();
    request_1.default({
        url: "https://disparity-nuker-api.0w218021.repl.co/update",
        method: "GET",
        json: {
            Version: 4.0,
        },
    }, (err, res, body) => {
        if (res.body.status === true) {
            logo_1.logo();
            console.log(" ");
            console.log(createString_1.createString("You are on a out-dated version", "semi", "fail"));
            console.log(" ");
            rl.question(createString_1.createString("Type anything to update"), () => {
                open_1.default(res.body.message);
                console.log(" ");
                console.log(createString_1.createString("Closing window in 5 seconds", "semi"));
                setTimeout(() => {
                    process.exit();
                }, 5000);
            });
            return;
        }
        logo_1.logo();
        logo_1.startMenuLogo();
        rl.question(createString_1.createString("Enter option"), (option) => {
            if (option === "1") {
                login_1.default(rl);
            }
            else if (option === "2") {
                register_1.default(rl);
            }
            else if (option === "4") {
                if (res.body.status === true) {
                    open_1.default(res.body.message);
                }
                else {
                    console.log("");
                    console.log(createString_1.createString("You are on the newest version!", "semi"));
                    setTimeout(() => {
                        toolStart();
                    }, 1500);
                    return;
                }
            }
            else {
                console.log("");
                console.log(createString_1.createString("COMING SOON!", "semi", "fail"));
                setTimeout(() => {
                    toolStart();
                }, 1500);
                return;
            }
        });
    });
}
toolStart();
exports.default = toolStart;
