const {ethers, upgrades}  = require('hardhat');

const proxyAddress = '0x08C6BDBd8627E97403C69A63d48e04A36e2DC14c';

//What the script does is basically change the current Proxy pointer 
// to a newly deployed VendingMachineV2!

async function main() {

    const VendingMachineV5 = await ethers.getContractFactory("VendingMachineV5");

    //const proxy = await upgrades.deployProxy(VendingMachineV1, [49]);
    const upgraded = await upgrades.upgradeProxy(proxyAddress, VendingMachineV5);
    const upgradedProxyOwner = await upgraded.owner();

    const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);


    console.log("The current contract owner : ", upgradedProxyOwner);  // The current contract owner :  0x01e07A5371035BeC2A86e1Ff9eaAC6b002edB102

    console.log("Implementation V5 Contract Address: ", implementationAddress);  // Implementation V5 Contract Address:  0x896dB3DDE6e1f0808fcE05D0f60875F70Fb150a3
 
}

main()
.then(()=> process.exit(0))
.catch((err) => {
  console.error(err);
  process.exit(1);
});