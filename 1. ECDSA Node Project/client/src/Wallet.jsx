import server from "./server";
import {secp256k1} from 'ethereum-cryptography/secp256k1';
import {toHex} from 'ethereum-cryptography/utils'

function Wallet({ address, setAddress, balance, setBalance,privateKey,setPrivateKey}) {

  async function onChangeOfKey(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    if (privateKey) {
      const address = toHex(secp256k1.getPublicKey(privateKey));
      setAddress(address);
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Input your private key here" value={privateKey} onChange={onChangeOfKey}></input>
      </label>
      <label>
        Wallet Address : {address.slice(0,10)}... 
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
