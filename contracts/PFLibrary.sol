// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./PFToken.sol";

contract PFLibrary is ERC721URIStorage {
  PFToken public poxToken;

  struct Book {
    address author;
    string tokenURI;
    uint price;
    uint totalSupply;
  }

  uint256 public bookCount;
  uint256 public totalBooksMinted;
  mapping(uint256 => Book) public books;
  mapping(address => uint256[]) public ownedBooks;

  constructor(address _poxAddress) ERC721("PFLibrary", "PFL") {
    poxToken = PFToken(_poxAddress);
  }

  function addBook(address authorAddress, string memory tokenURI, uint poxPrice) public {
    bookCount++;
    books[bookCount] = Book(authorAddress, tokenURI, poxPrice, 0);
  }

  function mintBook(uint256 bookId, address recipient) public {
    require(bytes(books[bookId].tokenURI).length != 0, "Book does not exist");
    require(poxToken.transferFrom(msg.sender, books[bookId].author, books[bookId].price), "Token transfer failed");

    books[bookId].totalSupply++;
    totalBooksMinted++;

    _mint(recipient, totalBooksMinted);
    _setTokenURI(totalBooksMinted, books[bookId].tokenURI);

    ownedBooks[recipient].push(totalBooksMinted);
  }

  function totalBooks() public view returns (uint256) {
    return bookCount;
  }

  function getBook(uint256 bookId) public view returns (address author, string memory tokenURI, uint poxPrice, uint totalSupply) {
    require(bytes(books[bookId].tokenURI).length != 0, "Book does not exist");
    Book storage book = books[bookId];
    return (book.author, book.tokenURI, book.price, book.totalSupply);
  }

  function getOwnedBooks(address owner) public view returns (uint256[] memory) {
    return ownedBooks[owner];
  }
}

