// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Party {
	
uint entryFee;
mapping (address => bool) paid;
address[] members;

constructor(uint _entryFee) {

    entryFee = _entryFee;

}

function rsvp() external payable {
    require(!paid[msg.sender]);
    require(msg.value == entryFee); 
    members.push(msg.sender);
    paid[msg.sender] = true;
}

function payBill(address venue, uint amount) external {
    (bool sent, ) = venue.call{value: amount}("");
    require(sent);
    uint share = address(this).balance / members.length;

    for(uint i=0; i < members.length; i++) {
        (bool success, ) = members[i].call{value: share}("");
        require (success);
    }
}

}