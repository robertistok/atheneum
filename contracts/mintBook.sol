// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MintBook is ERC1155 {
    using Counters for Counters.Counter;

    Counters.Counter public bookIds;
    string public baseURI;

    //book bookId => bookURI
    mapping(uint256 => string) public tokensURI;
    
    constructor() ERC1155("") {}

    function mintABook(uint256 quantity, string memory URI)
        external
        returns (uint256)
    {
        uint256 bookId = bookIds.current();

        tokensURI[bookId] = URI;
        _mint(msg.sender, bookId, quantity, "");

        bookIds.increment();

        return bookId;
    }
}
