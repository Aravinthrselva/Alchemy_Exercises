


const {ethers} = require("hardhat");

async function main() {

    const[owner] = await ethers.getSigners();

  const emitAddress = "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502";

  // deploying the 'Broker.sol' 
  // and passing the 'emitWinner' contract's address to 'Broker.sol' contract's constructor

  const Broker = await ethers.getContractFactory("Broker");
  const broker = await Broker.deploy(emitAddress);
  await broker.deployed();

  console.log("broker deployed address: ", broker.address);        // 0xB34A68b93FCEd422a2595B69671be6D2A723fd37
  console.log("owner address : ", owner.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
