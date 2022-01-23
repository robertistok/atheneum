// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MintBook is ERC1155 {
    using Counters for Counters.Counter;

    Counters.Counter public bookIds;
    string public baseURI;
    //book title to bookId
    mapping(string => uint256) books;
    //book title => bookURI
    mapping(uint => string) booksURI;

    constructor() ERC1155("") {}

    function _baseURI() internal view virtual returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _baseURIParam) public {
        baseURI = _baseURIParam;
    }

    function mintABook(uint256 quantity, string calldata title)
        public
        returns (uint256)
    {
        uint256 bookId = bookIds.current();

        books[title] = bookId;
        booksURI[bookId] = baseURI;
        _mint(msg.sender, bookId, quantity, "");

        bookIds.increment();

        return bookId;
    }
}
