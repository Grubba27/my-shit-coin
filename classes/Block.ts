import crypto from "crypto";
import Transaction from "./Transaction";

export default class Block {

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
