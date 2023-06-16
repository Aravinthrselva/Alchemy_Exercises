// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract VendingMachineV4 is Initializable {
  // these state variables and their values
  // will be preserved forever, regardless of upgrading
  uint public numSodas;
  address public owner;

  uint public priceOfSoda; 
  mapping (address => uint) public unitsPurchased;


  function initialize(uint _numSodas) public initializer {
    numSodas = _numSodas;
    owner = msg.sender;
  }

    modifier onlyOwner()  {
    require(msg.sender == owner);
    _;
    }


  function purchaseSoda(uint numOfSodas) public payable {

    // require(numOfSodas > 0, "You want nothing?");
    require(numSodas >= numOfSodas, "Better luck next time, We dont have that many");
    priceOfSoda = 0.001 ether;
    uint totalCost = (priceOfSoda * numOfSodas);
    require(msg.value >= totalCost, "one soda costs 1000000000000000 wei dude!");
    unitsPurchased[msg.sender] += numOfSodas;
    numSodas -= numOfSodas;
  }

  function setNewOwner(address newOwner) public onlyOwner {
    owner = newOwner;
  }

  function loadSodas(uint newSodas) external onlyOwner {
    require(newSodas > 0, "Are you kidding? The batch is empty!");
    numSodas += newSodas;
  }

  function withdraw() public onlyOwner {
    require(address(this).balance > 0, "No funds in contract");
    (bool sent, ) = owner.call{value: address(this).balance}("");
    require(sent, "Failed to send Ether");
  }
}
