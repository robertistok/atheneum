//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AthenaeumDAO {
    address public bookMintAddress = 0x6D310E272eBf24F97942C517B7A4C5e251D1745C;
    address owner;
    //mapping of address to balance
    mapping(address => uint256) public balance;

    //contructor to set token type accepted by the vault
    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier bookMintAddressOnly() {
        require(msg.sender == bookMintAddress);
        _;
    }

    function deposit(uint256 _amount) public payable bookMintAddressOnly {
        require(_amount > 0, "Enter valid amount");
        require(msg.value == _amount, "eth should equal to amount");
        balance[msg.sender] += _amount;
    }

    function withdraw(uint256 _amount) public onlyOwner {
        require(_amount > 0, "Enter valid amount");
        require(_amount <= balance[msg.sender], "Withdrawal amount too high");
        payable(msg.sender).transfer(_amount);
        balance[msg.sender] -= _amount;
    }

    //set the address for the book token contract and set the erc20 book token
    function setBookMintContract(address _address) external onlyOwner {
        bookMintAddress = _address;
    }

    receive() external payable {}
}
