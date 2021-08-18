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
const ban_1 = __importDefault(require("./nuker/ban"));
const fs_1 = __importDefault(require("fs"));
const sleep_1 = __importDefault(require("../../utils/sleep"));
const delete_channels_1 = __importDefault(require("./nuker/delete-channels"));
const create_channel_1 = __importDefault(require("./nuker/create-channel"));
const deleteRole_1 = __importDefault(require("./nuker/deleteRole"));
const createRole_1 = __importDefault(require("./nuker/createRole"));
const kick_1 = __importDefault(require("./nuker/kick"));
function nukeMenu(client, rl) {
    console.clear();
    logo_1.logo();
    logo_1.nukingMenuOptions();
    rl.question(createString_1.createString("Enter option"), (option) => {
        if (option === "menu") {
            main_1.default(client, rl);
            return;
        }
        rl.question(createString_1.createString("Enter server ID"), (guildId) => __awaiter(this, void 0, void 0, function* () {
            let server = client.guilds.cache.get(guildId);
            if (!server) {
                console.log(" ");
                console.log(createString_1.createString("Unknown server", "semi", "fail"));
                setTimeout(() => {
                    main_1.default(client, rl);
                }, 1000);
                return;
            }
            let members = server.members.cache.map((m) => m.id);
            let channels = server.channels.cache.map((c) => c.id);
            let roles = server.roles.cache.map((r) => r.id);
            if (fs_1.default.existsSync("members.txt")) {
                fs_1.default.readFile("members.txt", "utf-8", (err, data) => {
                    let fileArray = data.replace(/[\r]/g, "").split("\n");
                    members = fileArray;
                });
                yield sleep_1.default(1000);
            }
            if (option === "1") {
                rl.question(createString_1.createString("Enter channel names"), (channelName) => {
                    rl.question(createString_1.createString("Enter channel amount"), (channelAmount) => {
                        channelAmount = Number(channelAmount);
                        if (!channelAmount) {
                            console.log(" ");
                            console.log(createString_1.createString("Channel Amount is not number", "semi", "fail"));
                            setTimeout(() => {
                                main_1.default(client, rl);
                            }, 1000);
                            return;
                        }
                        rl.question(createString_1.createString("Enter role names"), (roleName) => {
                            rl.question(createString_1.createString("Enter role amount"), (roleAmount) => {
                                roleAmount = Number(roleAmount);
                                if (!roleAmount) {
                                    console.log(" ");
                                    console.log(createString_1.createString("Amount is not number", "semi", "fail"));
                                    setTimeout(() => {
                                        main_1.default(client, rl);
                                    }, 1000);
                                    return;
                                }
                                deleteRole_1.default(client, roles, guildId);
                                delete_channels_1.default(client, channels, guildId, rl, server, false);
                                ban_1.default(client, members, guildId);
                                createRole_1.default(client, guildId, {
                                    name: roleName,
                                    amount: roleAmount,
                                }, rl, server, false);
                                create_channel_1.default(client, guildId, {
                                    name: channelName,
                                    amount: channelAmount,
                                }, rl, server, false);
                            });
                        });
                    });
                });
            }
            if (option === "2") {
                ban_1.default(client, members, guildId);
            }
            if (option === "3") {
                kick_1.default(client, members, guildId);
            }
            if (option === "4") {
                rl.question(createString_1.createString("Enter channel names"), (channelName) => {
                    rl.question(createString_1.createString("Enter channel amount"), (channelAmount) => {
                        channelAmount = Number(channelAmount);
                        if (!channelAmount) {
                            console.log(" ");
                            console.log(createString_1.createString("Amount is not number", "semi", "fail"));
                            setTimeout(() => {
                                main_1.default(client, rl);
                            }, 1000);
                            return;
                        }
                        create_channel_1.default(client, guildId, {
                            name: channelName,
                            amount: channelAmount,
                        }, rl, server);
                    });
                });
            }
            if (option === "5") {
                delete_channels_1.default(client, channels, guildId, rl, server);
            }
            if (option === "6") {
                rl.question(createString_1.createString("Enter role names"), (roleName) => {
                    rl.question(createString_1.createString("Enter role amount"), (roleAmount) => {
                        roleAmount = Number(roleAmount);
                        if (!roleAmount) {
                            console.log(" ");
                            console.log(createString_1.createString("Amount is not number", "semi", "fail"));
                            setTimeout(() => {
                                main_1.default(client, rl);
                            }, 1000);
                            return;
                        }
                        createRole_1.default(client, guildId, {
                            name: roleName,
                            amount: roleAmount,
                        }, rl, server);
                    });
                });
            }
            if (option === "7") {
                deleteRole_1.default(client, roles, guildId);
            }
        }));
    });
}
exports.default = nukeMenu;
