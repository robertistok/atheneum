//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BookToken is ERC20 {
    uint256 initialSupply;
    address owner;
    address mintBookContract = 0x6D310E272eBf24F97942C517B7A4C5e251D1745C;
    address public dao;
    address team;
    address teamMember2;
    address teamMember3;
    address teamMember4;
    address teamMember5; 
    uint256 teamAmount;
    uint256 communityAmount;

    constructor() ERC20("Book", "Book") {
        owner = msg.sender;
        //mint initial supply
        initialSupply = 500000000 ether;

        team = 0xB66f8d3B872c9217503C7c1EB8a0BE4A74C956ce;
        teamMember2 = 0xa9d611A2BE63b0Ab559cDC9938Ef4fE03d78aC53;
        teamMember3 = 0x56B03168Fe9E6D8cECBC08D5742d0Fb53C43697d;
        teamMember4 = 0xF426238081859800897A412B10043AAddDF2117e;
        teamMember5 = 0x36b28dd1Bf3a9328b0Ce8b4E376FD1C4C99d23ba;

        teamAmount = teamAmount / 2;
        communityAmount = (initialSupply * 9) / 10;


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

        //set the address for the book mint contract
    function distributeInitial() external onlyOwner {
        
        _mint(team, teamAmount);
        _mint(teamMember2, teamAmount);
        _mint(teamMember3, teamAmount);
        _mint(teamMember4, teamAmount);
        _mint(teamMember5, teamAmount);
        _mint(dao, communityAmount);
    
    }



        //set the address for the book mint contract
    function setDaoContract(address _address) external onlyOwner {
        dao = _address;
    }

    function getMintBookContract() external view onlyOwner returns (address) {
        return mintBookContract;
    }
}
