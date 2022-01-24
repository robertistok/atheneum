// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MintBook is ERC1155 {
    using Counters for Counters.Counter;

    Counters.Counter public bookIds;
    string public baseURI;
    struct Book {
        uint256 price;
        string URI;
        address author;
    }

    //book bookId => bookURI
    mapping(uint256 => Book) public books;

    constructor() ERC1155("") {}

    /**
     * @dev Returns an URI for a given token ID
     */
    function tokenURI(uint256 _tokenId) public view returns (string memory) {
        return books[_tokenId].URI;
    }

    //https://docs.soliditylang.org/en/latest/contracts.html#receive-ether-function
    receive() external payable {}

    function mintABook(
        uint256 _quantity,
        string memory _URI,
        uint256 _price
    ) external returns (uint256) {
        uint256 bookId = bookIds.current();

        books[bookId] = Book({price: _price, URI: _URI, author: msg.sender});
        _mint(msg.sender, bookId, _quantity, "");
        bookIds.increment();

        return bookId;
    }

    function buy(uint256 _bookId) public payable returns (bool) {
        //enough eth => price
        require(msg.value == books[_bookId].price, "Not enough eth");
        require(msg.sender != address(0), "Cannot have zero address");
        //transfer
        safeTransferFrom(books[_bookId].author, msg.sender, _bookId, 1, "");
        payable(books[_bookId].author).transfer(msg.value);
        return true;
    }
}
