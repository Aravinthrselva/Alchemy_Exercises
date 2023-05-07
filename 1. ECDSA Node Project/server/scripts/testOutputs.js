

const {secp256k1} = require("ethereum-cryptography/secp256k1");
const {keccak256} = require("ethereum-cryptography/keccak");
const {utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

let sender = "0218cda6cf8293a3804a7dde7c8510da258bf463825549f06b7fa3116c118686d8";
let recipient = "026544903ccbea4f0421542547dc39db517bf3326f446e906eaf50beec4ee25f90";
let amount = 25; 
let privateKey = "33a3d9f485501876fa2d47d6594e46bdb37d9dd3f4d0a5a185b6a6a2e350c0d0";


const data = {sender: sender, recipient, amount: parseInt(amount)};  
console.log("1. Data looks : ", data );


const bytesData = utf8ToBytes(JSON.stringify(data));
console.log("2. bytesData looks : ", bytesData );


const hashedData = keccak256(bytesData);
console.log("3. hashedData looks : ", hashedData );

const hexHashedData = toHex(hashedData);
console.log("3. hashedData HEX looks : ", hexHashedData );

const signature = secp256k1.sign(hexHashedData, privateKey);
console.log("4. SIGNATURE LOOKS LIKE THIS :", signature);

const publicKey =  signature.recoverPublicKey(hashedData);

console.log("5. recovered public key:", publicKey);

const isSigned = secp256k1.verify(signature, hashedData, sender);
console.log("6. isSigned :", isSigned);