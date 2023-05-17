//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract emitWinner {
    event Winner(address);


 // The 'msg.sender' should NOT be the same as 'tx.origin' for this event to be emitted   
    function attempt() external {
        require(msg.sender != tx.origin, "msg.sender is equal to tx.origin");
        emit Winner(msg.sender);
    }
}