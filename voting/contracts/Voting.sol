// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    address public owner;

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addCandidate(string memory _name) public onlyOwner {
        uint newId = candidates.length;
        candidates.push(Candidate(newId, _name, 0));
    }

    function vote(uint candidateId) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(candidateId < candidates.length, "Invalid candidate");

        candidates[candidateId].voteCount++;
        hasVoted[msg.sender] = true;
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getWinner() public view returns (Candidate memory) {
        uint count = candidates.length;
        require(count > 0, "No candidates");

        uint winnerIndex = 0;
        uint maxVotes = 0;

        for (uint i = 0; i < count; i++) {
            uint votes = candidates[i].voteCount;
            if (votes > maxVotes) {
                maxVotes = votes;
                winnerIndex = i;
            }
        }

        if (maxVotes == 0) {
            return Candidate(0, "No winner", 0);
        }

        return candidates[winnerIndex];
    }
}
