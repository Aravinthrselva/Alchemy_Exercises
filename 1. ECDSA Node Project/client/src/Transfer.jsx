import { useState } from "react";
import {secp256k1} from "ethereum-cryptography/secp256k1";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

import server from "./server";

function Transfer({ address, setBalance,privateKey}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const data = { sender: address, recipient, amount: parseInt(sendAmount)};
    console.log("1. Data Looks :", data);

    const bytes = utf8ToBytes(JSON.stringify(data));
    console.log("2. After utf8ToBytes :", bytes);

    const hashedData = keccak256(bytes);
    console.log("3. After keccak256 :", hashedData);

    const hexHashedData = toHex(hashedData);
    console.log("4. After toHex :", hexHashedData);


    const signature = secp256k1.sign(hashedData, privateKey);
    console.log("5. Signature Looks: ", signature);

    // var sig = Array.from(signature[0])

     try {
      const {
        data: { balance },
      } = await server.post(`send`, {sender: address, recipient, amount: parseInt(sendAmount), signature, hashedData});
      setBalance(balance);
    } catch (ex) {
      console.log(ex);
      alert(ex);
    }
  }



  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Recipient
        <input
          placeholder="wallet address of the reciever here"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>



      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
