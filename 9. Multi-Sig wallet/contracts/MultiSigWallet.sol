// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {

    address[] public owners;
    uint public required;

    struct Transaction {
        address recipient;
        uint amount;
        bool executed;
        bytes data;
    }

    mapping (uint => Transaction) public transactions;
    uint public transactionCount;

    mapping(uint => mapping(address => bool)) public confirmations;

    constructor(address[] memory _owners, uint _required) {
        
        require(_required > 0 && _owners.length >= _required);
        owners = _owners;
        required = _required;
    }

        function isOwner(address addr) internal view returns(bool) {
            for(uint i=0; i<owners.length; i++) {
                if(addr == owners[i]) return true;
            }
                return false;
        }

    function addTransaction(address _recipient, uint _amount, bytes memory _data) internal returns(uint) {
        uint transactionId = transactionCount;     
        transactions[transactionCount] =  Transaction(_recipient, _amount, false, _data);
        transactionCount++;
        return transactionId;
    }

    function confirmTransaction(uint _transactionId) public {
                require(isOwner(msg.sender));
                confirmations[_transactionId][msg.sender] = true;
                if(isConfirmed(_transactionId)) {
                executeTransaction(_transactionId);
                }
            
    }
    
    function getConfirmationsCount(uint _transactionId) public view returns(uint confirmedCount) {
            
            for(uint i=0; i<owners.length; i++) {
                if(confirmations[_transactionId][owners[i]] == true) 
                    confirmedCount += 1;
                
            }
    }

    function submitTransaction(address _recipient, uint _amount, bytes memory _data) external {
        
        uint id= addTransaction(_recipient, _amount, _data);
        confirmTransaction(id);
    }

    function isConfirmed(uint _id) public view returns(bool) {
        uint confirmedNum = getConfirmationsCount(_id);
        if(confirmedNum >= required) return true;
        return false;
    }

    function executeTransaction(uint _id) public {
        require(isConfirmed(_id));
        Transaction storage _tx = transactions[_id];
        (bool sent, ) = _tx.recipient.call{value : _tx.amount}(_tx.data);
        require(sent);
        _tx.executed = true;
    }

    receive() external payable {}
}