

// This step is not necesssary since the contract is already present in goerli testnet
// But we need to compile 'emitWinner.sol' just to get the ABI of this contract
// so we can interact with it using the 'Broker.sol' during the test

const {ethers} = require("hardhat");

async function main() {


  const EmitWinner = await ethers.getContractFactory("emitWinner");
  const emitWinner = await EmitWinner.deploy();
  await emitWinner.deployed();

  console.log("emitWinner deployed address: ", emitWinner.address);     
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
