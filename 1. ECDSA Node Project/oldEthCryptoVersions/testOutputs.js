

const secp = require("ethereum-cryptography/secp256k1");
const {keccak256} = require("ethereum-cryptography/keccak");
const {utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

let sender = "0218cda6cf8293a3804a7dde7c8510da258bf463825549f06b7fa3116c118686d8";
let recipient = "026544903ccbea4f0421542547dc39db517bf3326f446e906eaf50beec4ee25f90";
let amount = 25; 
let privateKey = "33a3d9f485501876fa2d47d6594e46bdb37d9dd3f4d0a5a185b6a6a2e350c0d0";

async function main() {

const data = {sender: sender, recipient, amount: parseInt(amount)};  
console.log("1. Data looks : ", data );


const bytesData = utf8ToBytes(JSON.stringify(data));
console.log("2. bytesData looks : ", bytesData );


const hashedData = keccak256(bytesData);
console.log("3. hashedData looks : ", hashedData );

const signature = await secp.sign(hashedData, privateKey, { recovered: true });

console.log("4. SIGNATURE LOOKS LIKE THIS :", signature);

var sig = Array.from(signature[0]);
console.log("5. signature[0] LOOKS LIKE THIS :", sig);


let recovery =  signature[1];
console.log("6. signature[1] LOOKS LIKE THIS :", recovery);

const sign = new Uint8Array(sig);
console.log("7. sign new Uint8Array(sig) :", sign)


const publicKey =  secp.recoverPublicKey(hashedData, sign, recovery);

console.log("recovered public key:", publicKey);
console.log("recovered public key converted to hex:", toHex(publicKey).slice(0,66));


//new version 👇
// const isSigned = secp256k1.verify(signature, hashedData, sender);
// console.log("isSigned :", isSigned);

}

main();