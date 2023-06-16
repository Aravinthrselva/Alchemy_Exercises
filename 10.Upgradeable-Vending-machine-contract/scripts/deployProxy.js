const { ethers, upgrades } = require('hardhat');

async function main() {
    const VendingMachineV1 = await ethers.getContractFactory("VendingMachineV1");

    // deployProxy() takes the arguments passed into the VendingMachineV1's initialize() function in array format.

    //We are deploying our VendingMachineV1 with the numSodas state variable set to 49
    const proxy = await upgrades.deployProxy(VendingMachineV1, [49]);
    await proxy.deployed();

    const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxy.address);

    console.log('Proxy contract address: ', proxy.address);                    //Proxy contract address:  0x08C6BDBd8627E97403C69A63d48e04A36e2DC14c  
                                                                                // Proxy Admin address : 0x0d7651f8382d1347c10a03bd58919a82bba3c3c1
    console.log('Implementation contract address: ', implementationAddress);   //Implementation contract address: 0x1b89e611BF8D119A4C588740570E88468D3c437D
}

main()
.then(()=> process.exit(0))
.catch((err) => {
  console.error(err);
  process.exit(1);
});