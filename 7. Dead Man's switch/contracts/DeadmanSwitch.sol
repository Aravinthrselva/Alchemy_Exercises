// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Switch {
    address recipient;
    address owner;
    uint lastAction;
    constructor(address _recipient) payable {
        owner = msg.sender;
        recipient = _recipient;
        lastAction = block.timestamp;
    }

    function withdraw() external {
        require((block.timestamp - lastAction) > 52 weeks);
        require(msg.sender == recipient);
        (bool sent, ) = recipient.call{value: address(this).balance}("");
        require(sent);
    }

    function ping() external {
        require(msg.sender == owner);
        lastAction = block.timestamp;

    }
}