//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract bookToken is ERC20 {

constructor () ERC20 ("Book", "Book") {}

receive() external payable {}

function mint(uint256 _amount) external {
    _mint(msg.sender, _amount);

}


}