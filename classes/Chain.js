"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const Block_1 = __importDefault(require("./Block"));
const Transaction_1 = __importDefault(require("./Transaction"));
class Chain {
    constructor() {
        this.chain = [new Block_1.default(null, new Transaction_1.default(1000, 'genesis', 'gabriel'))];
    }
    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }
    mine(nonce) {
        let solution = 1;
        console.log('mining for prof of work...');
        while (true) {
            const hash = crypto_1.default.createHash('MD5');
            hash.update((nonce + solution).toString()).end();
            const attempt = hash.digest('hex');
            if (attempt.substr(0, 4) === '0000') {
                console.log(`Solved: ${solution}`);
                return solution;
            }
            solution += 1;
        }
    }
    addBlock(transaction, senderPublicKey, signature) {
        const verifier = crypto_1.default.createVerify('SHA256');
        verifier.update(transaction.toString());
        const isValid = verifier.verify(senderPublicKey, signature);
        if (isValid) {
            const newBlock = new Block_1.default(this.lastBlock.hash, transaction);
            this.mine(newBlock.nonce);
            this.chain.push(newBlock);
        }
    }
}
exports.default = Chain;
Chain.instance = new Chain();
