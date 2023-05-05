const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

//  hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '7826240a1730a719ea4a486b0ae94db81af802bbe5058823047927d5fe48b1dc';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {name,proof} = req.body;

  //  prove that a name is in the list 
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
