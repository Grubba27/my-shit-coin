"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const Transaction_1 = __importDefault(require("./Transaction"));
const Chain_1 = __importDefault(require("./Chain"));
class Wallet {
    constructor() {
        const keypair = crypto_1.default.generateKeyPairSync("rsa", {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        });
        this.publicKey = keypair.privateKey;
        this.privateKey = keypair.privateKey;
    }
    sendMoney(amount, payeePublicKey) {
        const transaction = new Transaction_1.default(amount, this.publicKey, payeePublicKey);
        const sign = crypto_1.default.createSign('SHA256');
        sign.update(transaction.toString()).end();
        const signature = sign.sign(this.privateKey);
        Chain_1.default.instance.addBlock(transaction, this.publicKey, signature);
    }
}
exports.default = Wallet;
