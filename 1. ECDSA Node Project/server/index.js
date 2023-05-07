
const express = require("express");
const {secp256k1} = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils")

const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {                                                             // Prv Keys                                                               
  "027143524e025a29f9fb7894150a6e6955e2aca85542586af3a91e67e13c3d78b7": 100,   //c45dd931ed952016ebb4fec61aed27da07744b8c63c8dee94b13c19aa2965f88
  "0277845a6011586051f6c95c17f843ac410768cae6bf09bd7056285df0800b9970": 50,    //f71c7178f95c094f2130df1e76fd5e6807ec1087778abc057d9ab2336e2687f0
  "0253468cf6b103f7fa362fd2baacb04cda56682511e23aa2779427054ad180a153": 75,    //9bf0fc9542bb75e9f504b0cca708f6b758ab965c42af6bc0aa22428a424190e2
};



/*
1. Private key hex :  c45dd931ed952016ebb4fec61aed27da07744b8c63c8dee94b13c19aa2965f88
   Public key hex :  027143524e025a29f9fb7894150a6e6955e2aca85542586af3a91e67e13c3d78b7


2. Private key hex :  f71c7178f95c094f2130df1e76fd5e6807ec1087778abc057d9ab2336e2687f0
   Public key hex :  0277845a6011586051f6c95c17f843ac410768cae6bf09bd7056285df0800b9970


3. Private key hex :  9bf0fc9542bb75e9f504b0cca708f6b758ab965c42af6bc0aa22428a424190e2
   Public key hex :  0253468cf6b103f7fa362fd2baacb04cda56682511e23aa2779427054ad180a153

*/

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});


app.post("/send", async (req, res) => {
  const { sender, recipient, amount, signature, hashedData } = req.body;

  // if (!sender) res.status(404).send({ message: "sender missing" });
  // if (!recipient) res.status(400).send({ message: "recipient missing" });
  // if (!amount || amount == 0) res.status(400).send({ message: "amount missing" });
  // if (!signature) res.status(404).send({ message: "signature missing" });
  // if (!hexHashedData) res.status(400).send({ message: "hexHashedData missing" });

  try {

    const isSigned = secp256k1.verify(signature, hashedData, sender);

    if (isSigned) {
      res.status(400).send({ message: "signature is not valid" });
    }
    setInitialBalance(sender);
    setInitialBalance(recipient);
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
      console.log("Balances of sender: ",balances[sender])
    }
  }
  catch (err) {
    console.log(err.message);
  }

});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
