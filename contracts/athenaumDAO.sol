//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AthenaeumDAO {

    ERC20 token;
    address bookTokenAddress;
    address owner;
    //mapping of address to balance
    mapping(address => uint256) public balance;

    //contructor to set token type accepted by the vault
constructor () {

       token =  ERC20(bookTokenAddress);
       owner = msg.sender;

    }


        modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }


    modifier bookTokenAddressOnly() {
        require(msg.sender == bookTokenAddress);
        _;
    }


    function deposit(uint256 _amount) public bookTokenAddressOnly
    {

        require(_amount > 0, "Enter valid amount");
        token.transferFrom(msg.sender, address(this), _amount);
        balance[msg.sender]+= _amount;

    } 

    function withdraw(uint256 _amount) public onlyOwner
    {

        require(_amount > 0, "Enter valid amount");
        require(_amount <= balance[msg.sender], "Withdrawal amount too high");
        token.transferFrom(address(this),msg.sender, _amount);
        balance[msg.sender]-= _amount;


    }

}