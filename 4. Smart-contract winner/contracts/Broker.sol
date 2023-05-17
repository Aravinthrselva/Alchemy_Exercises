//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract Broker {

    address public emitWinnerContract;

    constructor(address _emitWinner) {
        emitWinnerContract = _emitWinner;
    }

    fallback() external {
        (bool success, ) = emitWinnerContract.call(msg.data);
        require(success);
       
    }


}