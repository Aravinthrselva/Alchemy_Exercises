/*
Our goal is the following 
0. emit the event of the emitWinner.sol contract @ 0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502
1. The 'msg.sender' should NOT be the same as 'tx.origin' for this event to be emitted 
2. We do this by using a 'Beoker.sol' contract as the middleman i.e, msg.sender
3. Final result 
3a. tx.origin = EOA 
3b. msg.sender = Broker.sol 
*/

const {ethers} = require('hardhat');

 async function main() {

    const[owner] = await ethers.getSigners();


    const brokerAddress = "0xB34A68b93FCEd422a2595B69671be6D2A723fd37";

    // using the ABI of emitWinner but the address of 'Broker.sol' to bypass hardhat/ethers (frontend) rejection, 
    // since 'Broker.sol' does not have an attempt() function 
    // the fallback() function of 'Broker.sol' will forward the msg.data 
    /// to the 'emitWinner.sol' already present in the goerli testnet at address : 0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502
    const brokerToEmitWinner = await ethers.getContractAt("emitWinner", brokerAddress);


    console.log("broker Contract Address: ", brokerToEmitWinner.address); 

    console.log("owner is : ", owner.address);


    // checking if the first value stored in Broker.sol is same as the 
    // 'emitWinner.sol' contract address passed into the constructor while deploying 

      const stored = await ethers.provider.getStorageAt(brokerAddress, '0x0');
      console.log("Value stored AT 0x0 :", stored);                                // 0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502

    const tx1 = await brokerToEmitWinner.connect(owner).attempt();

   
    console.log("Attack TX :", tx1);

  }

  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  
