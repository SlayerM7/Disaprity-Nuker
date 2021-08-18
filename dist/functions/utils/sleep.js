"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}
exports.default = default_1;
