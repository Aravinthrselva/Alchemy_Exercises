const { toHex } = require("ethereum-cryptography/utils");
const {secp256k1} = require("ethereum-cryptography/secp256k1");
//const { keccak256 } = require("ethereum-cryptography/keccak");


const privateKey = secp256k1.utils.randomPrivateKey();
const publicKey =  secp256k1.getPublicKey(privateKey);


console.log("Private key hex : ", toHex(privateKey));
console.log("Public key hex : ", toHex(publicKey));



/*
1. Private key hex :  c45dd931ed952016ebb4fec61aed27da07744b8c63c8dee94b13c19aa2965f88
   Public key hex :  027143524e025a29f9fb7894150a6e6955e2aca85542586af3a91e67e13c3d78b7


2. Private key hex :  f71c7178f95c094f2130df1e76fd5e6807ec1087778abc057d9ab2336e2687f0
   Public key hex :  0277845a6011586051f6c95c17f843ac410768cae6bf09bd7056285df0800b9970


3. Private key hex :  9bf0fc9542bb75e9f504b0cca708f6b758ab965c42af6bc0aa22428a424190e2
   Public key hex :  0253468cf6b103f7fa362fd2baacb04cda56682511e23aa2779427054ad180a153

*/


/*
STEPS TO CONVERT A PUBLIC KEY TO A 20 byte WALLET ADDRESS 
converting public key to 20byte public wallet address
First step, you'll need to take the first byte off the public key. 
The first byte indicates the format of the key, whether it is in the compressed format or not. 
The publicKey will be a Uint8Array so you can use the slice method to slice off the first byte.
*/


/*
console.log("publicKey before hex:", publicKey);


// Next, take the keccak hash of the rest of the public key.
const hash = keccak256(publicKey.slice(1));
const WalletAddr =  toHex(hash.slice(-20)).toUpperCase();
const finalWallet = "0x"+ WalletAddr;


console.log("publicWallet before hex: ", hash);
console.log("publicWallet after hex: ", WalletAddr);
console.log("finalWallet after 0x prefix: ", finalWallet);

*/

