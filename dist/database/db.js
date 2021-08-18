"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { slayersDBJSON } = require("slayer.db");
let db = new slayersDBJSON({
    saveReadable: true,
});
exports.default = db;
