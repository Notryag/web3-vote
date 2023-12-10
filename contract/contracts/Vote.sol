// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@OpenZeppelin/contracts/access/Ownable.sol";

contract Vote is Ownable {
    struct Voter {
        uint256 amount;
        bool isVoted;
        address delegator;
        uint256 targetId;
    }

    struct Board {
        string name;
        uint256 totalAmount;
    }
    // 主持人信息
    address public host;

    mapping(address => Voter) public voters;

    Board[] public board;

    constructor(string[] memory nameList) Ownable(msg.sender) {
        host = msg.sender;
        voters[host].amount = 1;
        for (uint256 i = 0; i < nameList.length; i++) {
            Board memory boardItem = Board(nameList[i], 0);
            board.push(boardItem);
        }
    }

    function getBoardInfo() public view returns (Board[] memory) {
        return board;
    }

    //
    function mandate(address[] calldata addressList) public onlyOwner {
        for (uint256 i = 0; i < addressList.length; i++) {
            if (!voters[addressList[i]].isVoted) {
                voters[addressList[i]].amount = 1;
            }
        }
    }

    // 投票给别人
    function dalegate(address to) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.isVoted, "you aleardy voted!");
        require(msg.sender != to, "not to delegate youseldf");

        while (voters[to].delegator != address(0)) {
            to = voters[to].delegator;
            require(to == msg.sender, unicode"不能循环委托");
        }

        sender.isVoted = true;
        sender.delegator = to;
        Voter storage _delegator = voters[to];
        if (_delegator.isVoted) {
            board[_delegator.targetId].totalAmount += sender.amount;
        } else {
            _delegator.amount += sender.amount;
        }
    }

    // 投票
    function vote(uint targetId) public {
        Voter storage sender = voters[msg.sender];
        require(sender.amount != 0, "Has no right to vote.");
        require(!sender.isVoted, "Already voted");
        sender.isVoted = true;
        sender.targetId = targetId;
        board[targetId].totalAmount += sender.amount;
        emit voteSuccess(unicode"vote success");
    }

    event voteSuccess(string);
}
