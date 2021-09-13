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
    this.chain = [new Block(null, new Transaction(1000, 'genesis', 'first one'))]
  }

  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(transaction: Transaction, senderPublicKey: string, signature: string){
    const newBlock = new Block(this.lastBlock.hash, transaction);
    this.chain.push(newBlock)
  }
}


