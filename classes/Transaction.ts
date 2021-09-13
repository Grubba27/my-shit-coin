export default class Transaction {
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
