const MerkleTree = require('./MerkleTree');
const niceList = require('./niceList');
const verifyProof = require('./verifyProof');

// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

// get the root
const root = merkleTree.getRoot();

console.log("Root is :", root);

// find the proof that norman block is in the list 
const name = 'Avantgarde';
const index = niceList.findIndex(n => n === name);

const proof = merkleTree.getProof(index);


console.log("Avantgarde index :", index);
console.log("Proof looks like : ", proof);

// verify proof against the Merkle Root
console.log("is Avantgarde present ?", verifyProof(proof, name, root) ); // true, Norman Block is in the list!


// TRY IT OUT: what happens if you try a name not in the list, or a fake proof?