const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const serverUrl = 'http://localhost:1225';

async function main() {
  // ask for name on the console
  readline.question("Your Name ?", async (name) => {
  // TODO: how do we prove to the server we're on the nice list? 
const merkleTree = new MerkleTree(niceList);  
//const name = 'Avantgarde';
const index = niceList.findIndex(n => n === name);
const proof = merkleTree.getProof(index);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name,
    proof
  });

  console.log({ gift });
  readline.close();
});
}

main();