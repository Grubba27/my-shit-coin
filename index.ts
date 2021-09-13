import * as crypto from "crypto";

class Transaction {
  constructor(
    public amount: number,
    public payer: string,
    public payee: string
  ) {
  }
  toString(): string  {
    return JSON.stringify(this);
  }
}

class Block {

  public nonce = Math.round(Math.random() * 999999999);

  constructor(
    public prevHash: string | null,
    public transaction: Transaction,
    public timeStamp: number = Date.now()
  ) {
  }

  get hash() {
    const str = JSON.stringify(this);
    const hash = crypto.createHash('SHA256');
    hash.update(str).end();
    return hash.digest('hex');
  }
}

class Chain {
  public static instance = new Chain();
  chain: Block[];

  constructor() {
    this.chain = [new Block(null, new Transaction(1000, 'genesis', 'gabriel'))]
  }

  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  mine(nonce: number) {
    let solution = 1;
    console.log('mining for prof of work...');
    while (true){
      const hash = crypto.createHash('MD5');
      hash.update((nonce + solution).toString()).end();

      const attempt = hash.digest('hex');

      if (attempt.substr(0 , 4) === '0000') {
        console.log(`Solved: ${solution}`);
        return solution;
      }
      solution += 1;
    }
  }
  addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer){
    const verifier = crypto.createVerify('SHA256');
    verifier.update(transaction.toString());

    const isValid = verifier.verify(senderPublicKey, signature);

    if (isValid) {
      const newBlock = new Block(this.lastBlock.hash, transaction);
      this.mine(newBlock.nonce);
      this.chain.push(newBlock);
    }
  }
}

class Wallet {
  public publicKey: string;
  public privateKey: string;

  constructor() {
    const keypair = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: {type: 'spki', format: 'pem'},
      privateKeyEncoding: {type: 'pkcs8', format: 'pem'},
    });
    this.publicKey = keypair.privateKey;
    this.privateKey = keypair.privateKey;
  }

  sendMoney(amount: number, payeePublicKey: string) {
    const transaction = new  Transaction(amount, this.publicKey, payeePublicKey);

    const sign = crypto.createSign('SHA256');
    sign.update(transaction.toString()).end();

    const signature = sign.sign(this.privateKey);
    Chain.instance.addBlock(transaction, this.publicKey, signature);
  }
}


// usage in action

const gabriel = new Wallet();
const jon = new Wallet();
const maria = new Wallet();

gabriel.sendMoney(50, jon.publicKey);
jon.sendMoney(10, maria.publicKey);
maria.sendMoney(5, jon.publicKey);

console.log(Chain.instance);
