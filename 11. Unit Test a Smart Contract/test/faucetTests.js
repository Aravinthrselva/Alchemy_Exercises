const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('Faucet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory('Faucet');
    const faucet = await Faucet.deploy({value: ethers.utils.parseEther("22")});

    const [owner, randomAddr] = await ethers.getSigners();

    let withdrawAmount = ethers.utils.parseUnits('1', 'ether');

    return { faucet, owner, withdrawAmount, randomAddr };
  }

  it('should deploy and set the owner correctly', async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it('should not allow withdrawals above .1 ETH at a time', async function () {
    const { faucet, withdrawAmount } = await loadFixture(
      deployContractAndSetVariables
    );
    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });


  it('code should be empty at the contract location after destroy', async function () {
    const { faucet, owner } = await loadFixture(
      deployContractAndSetVariables
    );

    let beforeDestroy = await ethers.provider.getCode(faucet.address);

    console.log("codeFound beforeDestroy: ", beforeDestroy);

    await faucet.connect(owner).destroyFaucet();

    let afterDestroy = await ethers.provider.getCode(faucet.address);   // getCode returns '0x' after the destroyFaucet() function is called

    console.log("codeFound afterDestroy is: ", afterDestroy);

    expect(afterDestroy).to.equal('0x');
  });


  it('withdrawAll() function should revertt calls from random addresses', async function () {
    const { faucet, randomAddr } = await loadFixture(
      deployContractAndSetVariables
    );

    await expect(faucet.connect(randomAddr).withdrawAll()).to.be.reverted;
  });


  it('5. The balance of the faucet contract should be 0 after withdrawAll() function gets called by the owner', async function () {
    const { faucet, owner} = await loadFixture(
      deployContractAndSetVariables
    );

    let faucetBalance1 = await ethers.provider.getBalance(faucet.address);
    let OwnerBalance1 = await ethers.provider.getBalance(owner.address);

    // const tx1 = await owner.sendTransaction({
    //   to: faucet.address,
    //   value: ethers.utils.parseEther("2"), // Sends exactly 2.0 ether
    // });

    

    console.log("Initial faucet balance: ", faucetBalance1);
    console.log("Initial OwnerBalance balance: ", OwnerBalance1);
    // console.log("OwnerBalance balance: ", tx1);

     const tx1 = await faucet.connect(owner).withdrawAll();
     console.log("withdraw TX ", tx1);

    let faucetBalance2 = await ethers.provider.getBalance(faucet.address);
    let ownerBalance2 = await ethers.provider.getBalance(owner.address);

    console.log("After Withdraw faucet balance: ", faucetBalance2);
    console.log("After Withdraw owner balance: ", ownerBalance2);
    
    expect(faucetBalance2).to.equal(0);
  });

});