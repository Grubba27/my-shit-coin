"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Wallet_1 = __importDefault(require("./classes/Wallet"));
const Chain_1 = __importDefault(require("./classes/Chain"));
// usage in action
console.log(Chain_1.default.instance);
const gabriel = new Wallet_1.default();
const jon = new Wallet_1.default();
const maria = new Wallet_1.default();
gabriel.sendMoney(50, jon.publicKey);
jon.sendMoney(10, maria.publicKey);
maria.sendMoney(5, jon.publicKey);
console.log(Chain_1.default.instance);
