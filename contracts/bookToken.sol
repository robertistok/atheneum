//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract bookToken is ERC20 {
    uint256 initialSupply;
    address owner;
    address mintBookContract;

    constructor() ERC20("Book", "Book") {
        owner = msg.sender;
        //mint initial supply
        //initialSupply = 500000000000000000000000000;

        initialSupply = 500000000 ether;

        address team = 0xB66f8d3B872c9217503C7c1EB8a0BE4A74C956ce;
        //address teamMember2 = 0xB66f8d3B872c9217503C7c1EB8a0BE4A74C956ce;
        //address teamMember3 = 0xB66f8d3B872c9217503C7c1EB8a0BE4A74C956ce;
        //address teamMember4 = 0xB66f8d3B872c9217503C7c1EB8a0BE4A74C956ce;
        //address teamMember5 = 0xB66f8d3B872c9217503C7c1EB8a0BE4A74C956ce;

        uint256 teamAmount = initialSupply / 10; //team gets 10% of initial supply
        //uint256 communityAmount = initialSupply / 2;
        //uint256 authorsAmount = (initialSupply * 3)/ 20;
        //uint256 readersamAmount = initialSupply / 4;

        _mint(team, teamAmount);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyBookMintContract() {
        require(msg.sender == mintBookContract);
        _;
    }

    receive() external payable {}

    //make this mint only callable by the book mint contract
    function mintForBookBuyer(uint256 _amount, address _receiver)
        external
        onlyBookMintContract
    {
        _mint(_receiver, _amount);
    }

    //set the address for the book mint contract
    function setMintBookContract(address _address) external onlyOwner {
        mintBookContract = _address;
    }

    function getMintBookContract() external view onlyOwner returns (address) {
        return mintBookContract;
    }
}
