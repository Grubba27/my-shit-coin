import Wallet from "./classes/Wallet";
import Chain from "./classes/Chain";


// usage in action
console.log(Chain.instance);
const gabriel = new Wallet();
const jon = new Wallet();
const maria = new Wallet();

gabriel.sendMoney(50, jon.publicKey);
jon.sendMoney(10, maria.publicKey);
maria.sendMoney(5, jon.publicKey);

console.log(Chain.instance);
