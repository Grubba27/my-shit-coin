"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class Block {
    constructor(prevHash, transaction, timeStamp = Date.now()) {
        this.prevHash = prevHash;
        this.transaction = transaction;
        this.timeStamp = timeStamp;
        this.nonce = Math.round(Math.random() * 999999999);
    }
    get hash() {
        const str = JSON.stringify(this);
        const hash = crypto_1.default.createHash('SHA256');
        hash.update(str).end();
        return hash.digest('hex');
    }
}
exports.default = Block;
