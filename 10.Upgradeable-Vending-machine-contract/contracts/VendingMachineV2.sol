// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract VendingMachineV2 is Initializable {
  // these state variables and their values
  // will be preserved forever, regardless of upgrading
  uint public numSodas;
  address public owner;


  function initialize(uint _numSodas) public initializer {
    numSodas = _numSodas;
    owner = msg.sender;
  }

    modifier onlyOwner()  {
    require(msg.sender == owner);
    _;
    }


  function purchaseSoda() public payable {
    require(msg.value >= 1000 wei, "You must pay 1000 wei for a soda!");
    numSodas--;
  }

  function setNewOwner(address newOwner) public onlyOwner {
    owner = newOwner;
  }

  function withdraw() public onlyOwner {
    require(address(this).balance > 0, "No funds in contract");
    (bool sent, ) = owner.call{value: address(this).balance}("");
    require(sent, "Failed to send Ether");
  }
}
