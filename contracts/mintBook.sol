// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MintBook is ERC1155, ERC1155Holder {
    using Counters for Counters.Counter;

    Counters.Counter public bookIds;
    string public baseURI;
    struct Book {
        uint256 price;
        string URI;
        address payable author;
    }

    //book bookId => bookURI
    mapping(uint256 => Book) public books;
    //buyer => array of books
    mapping(address => uint[]) internal booksOwnedByUser;

    constructor() ERC1155("") {}

    /**
     * @dev Returns an URI for a given token ID
     */
    function tokenURI(uint256 _tokenId) public view returns (string memory) {
        return books[_tokenId].URI;
    }

    //https://forum.openzeppelin.com/t/how-do-i-let-a-user-transfer-erc1155-token-from-my-contract-address-to-his-address/12415/8
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC1155Receiver)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    //https://docs.soliditylang.org/en/latest/contracts.html#receive-ether-function
    receive() external payable {}

    function mintABook(
        uint256 _quantity,
        string memory _URI,
        uint256 _price
    ) external returns (uint256) {
        uint256 bookId = bookIds.current();

        books[bookId] = Book({
            price: _price,
            URI: _URI,
            author: payable(msg.sender)
        });
        _mint(address(this), bookId, _quantity, "");
        setApprovalForAll(address(this), true);
        bookIds.increment();

        return bookId;
    }

    function buy(uint256 _bookId) public payable returns (bool) {
        //enough eth => price
        require(msg.value >= books[_bookId].price, "Not enough eth");
        require(msg.sender != address(0), "Cannot have zero address");
        //transfer
        _safeTransferFrom(address(this), msg.sender, _bookId, 1, "");
        booksOwnedByUser[msg.sender].push(_bookId);
        payable(books[_bookId].author).transfer(uint(msg.value * 98 / 100));
        return true;
    }
    function getIds(address user) external view returns (uint[] memory) {
            return booksOwnedByUser[user];
        }
    function balanceOfEth() external view returns(uint){
        return address(this).balance;
    }
}
