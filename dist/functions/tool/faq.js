"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logo_1 = require("../../prints/logo");
const createString_1 = require("../utils/createString");
const getTheme_1 = require("../utils/getTheme");
const main_1 = __importDefault(require("./main"));
function faq(client, rl) {
    let i = 0;
    let askedQuestions = [
        {
            question: "It says unknown server",
            response: "Make sure your bot is in the server you want to nuke",
        },
        {
            question: "Where do I get help?",
            response: "Join: https://discord.gg/zQhPxMsG9v",
        },
        {
            question: "What is a server id?",
            response: "Each server has its own id that you need to nuke",
        },
        {
            question: "How do I get a server ID?",
            response: "Discord settings > Advanced > Developer mode",
        },
        {
            question: "How do I get another key?",
            response: "One key per person but you can ask for another",
        },
        {
            question: "How do I change my password?",
            response: "As of right now, You cannot change your password",
        },
        {
            question: "Where's newest version?",
            response: "You will be notified through the nuker if a new version is out",
        },
    ];
    function continueFaq() {
        console.clear();
        let mainColor = getTheme_1.getTheme();
        let index = askedQuestions[i];
        logo_1.logo();
        console.log(" ");
        console.log(createString_1.createString(`${mainColor("Question")}: ${index.question}`, "semi"));
        console.log(createString_1.createString(`${mainColor("Answer")}: ${index.response}`, "semi"));
        console.log(" ");
        if (i + 1 === askedQuestions.length) {
            console.log(" ");
            console.log(createString_1.createString("FAQ completed", "semi"));
            setTimeout(() => {
                rl.question(createString_1.createString("Type anything to continue"), () => {
                    main_1.default(client, rl);
                });
            }, 1000);
        }
        else
            rl.question(createString_1.createString("Would you like to view another"), (aa) => {
                aa = aa.trim().toLowerCase();
                if (aa === "y" || aa === "yes") {
                    i++;
                    continueFaq();
                }
                else if (aa === "n" || aa === "no" || aa === "menu") {
                    main_1.default(client, rl);
                }
                else {
                    main_1.default(client, rl);
                }
            });
    }
    continueFaq();
}
exports.default = faq;
