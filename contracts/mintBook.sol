// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "./bookToken.sol";

contract MintBook is ERC1155, ERC1155Holder, IERC2981 {
    using Counters for Counters.Counter;
    address public dao = 0x50d8Cdc273368C49106a8B5d3e4F6047F001DFC0;
    address public bookToken = 0x9bC592F6FA94d2fb98bdB292a6D9cc51DaEE4B3D;
    address owner;

    Counters.Counter public bookIds;
    struct Book {
        uint256 price;
        string URI;
        address payable author;
    }

    //book bookId => bookURI
    mapping(uint256 => Book) public books;
    //buyer => array of books
    mapping(address => uint256[]) internal booksOwnedByUser;

    constructor() ERC1155("") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

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
        override(ERC1155, ERC1155Receiver, IERC165)
        returns (bool)
    {
        return (interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(interfaceId));
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
        //transferFrom(address(this), msg.sender, _bookId, 1, "");
        booksOwnedByUser[msg.sender].push(_bookId);
        payable(books[_bookId].author).transfer(
            uint256((msg.value * 98) / 100)
        );
        payable(dao).transfer(uint256((msg.value * 2) / 100));
        //Call bookToken mint function to send goverannce tokens to buyer
        // BookToken(payable(bookToken)).mintForBookBuyer(1 ether, msg.sender);

        return true;
    }

    function getIds(address user) external view returns (uint256[] memory) {
        return booksOwnedByUser[user];
    }

    function balanceOfEth() external view returns (uint256) {
        return address(this).balance;
    }

    function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        address recipient = books[_tokenId].author;
        // 10%
        return (recipient, (_salePrice * 1000) / 10000);
    }

    function setBookTokenContract(address _tokenAddress) external onlyOwner {
        bookToken = _tokenAddress;
    }

    function setDaoContract(address _address) external onlyOwner {
        dao = _address;
    }
}
