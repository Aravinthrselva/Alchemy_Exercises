import Head from 'next/head'
import { Alchemy, Network } from 'alchemy-sdk';
import {useState, useEffect, useRef} from "react";
import styles from "../styles/Home.module.css";
// import { Transactions } from "./Transactions";


// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);



export default function Home() {

  const [blockNumber, setBlockNumber] = useState();
  const [txHash, setTxHash] = useState("");
  //const [transactions, setTransactions] = useState([]);
  //const [Receipt, setReceipt] = useState([])

  const getBlockWithTransactions = async(_blockNumber) => {
    try {

      const txList = await alchemy.core.getBlockWithTransactions(_blockNumber);
      console.log("TX LIST : ", txList);
  
    } catch(err) {
      console.log(err);
      
    }
  };

  const getTxReceipt = async(txHash) => {

    const txReceipt = await alchemy.core.getTransactionReceipt(txHash);
    console.log("TX Receipt : ", txReceipt);
    <Transactions transactions={txReceipt} />
  }




  useEffect(() => {
  async function getBlockNumber() {
    setBlockNumber(await alchemy.core.getBlockNumber());

  }
  getBlockNumber();

});


 /*const renderButton = async() => {

 return (
  <div style={{display: "flex-col"}}>
  <div>
    <input 
    className={styles.input}
    type="string"
    placeholder="Enter a hash"

    />
  </div>
  <button className={styles.button} >

    Check
  </button>
  </div> 
   )

 }*/


  return (
      <div>
      <Head>
        <title>My Block Explorer</title>
        <meta name="description" content="A Block Explorer Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome Explorer</h1>

          <div className={styles.description}>
            We are Currently @ Block : {blockNumber}
          </div>
          
          <div className={styles.description}>
            Check using a Block Number / Tx Hash 
            <br/>
            <br/>
            <p className={styles.p}>
            (Your result will show up in the console ⬇
              <br/>
              sorry, will fix this soon! 🙂 )
            </p>
            
            <div style={{display: "flex-col"}}>
            
            <div>
            <br/>
              <input 
              className={styles.input}
              type="number"
              placeholder="Block Number"
                   onChange={(e) => setBlockNumber((e.target.value))}
              />
           </div>
          
          <button className={styles.button} 
          onClick={() => getBlockWithTransactions(blockNumber)} >
          
           Check
         </button>
              


            <div>
              <input 
              className={styles.input}
              type="string"
              placeholder="Tx hash"
                   onChange={(e) => setTxHash((e.target.value))}
              />
           </div>
          
          <button className={styles.button} 
          onClick={() => getTxReceipt(txHash)} >
          
           Check
         </button>
          </div> 
          </div>
       </div>

       <div>
          <img className={styles.image} src="https://images.pexels.com/photos/3364025/pexels-photo-3364025.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
      </div>
      </div>
      <footer className={styles.footer}>
        Built with 💜 by AvantGard
      </footer>
      </div>
      
  )
}
