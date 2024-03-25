// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./PFToken.sol";

contract PFLibrary is ERC721URIStorage {
  PFToken public poxToken;

  struct Book {
    address author;
    string tokenURI;
    uint totalSupply;
  }

  uint256 public bookCount;
  mapping(uint256 => Book) public books;

  constructor(address _poxAddress) ERC721("PFLibrary", "PFL") {
    poxToken = PFToken(_poxAddress);
  }

  function addBook(address authorAddress, string memory tokenURI) public {
    bookCount++;
    books[bookCount] = Book(authorAddress, tokenURI, 0);
  }

  function mintBook(uint256 bookId, address recipient, uint256 amount) public {
    require(bytes(books[bookId].tokenURI).length != 0, "Book does not exist");
    require(poxToken.transferFrom(msg.sender, books[bookId].author, amount), "Token transfer failed");

    books[bookId].totalSupply++;

    _mint(recipient, books[bookId].totalSupply);
    _setTokenURI(books[bookId].totalSupply, books[bookId].tokenURI);
  }

  function totalBooks() public view returns (uint256) {
    return bookCount;
  }

  function getBook(uint256 bookId) public view returns (address author, string memory tokenURI, uint totalSupply) {
    require(bytes(books[bookId].tokenURI).length != 0, "Book does not exist");
    Book storage book = books[bookId];
    return (book.author, book.tokenURI, book.totalSupply);
  }
}

