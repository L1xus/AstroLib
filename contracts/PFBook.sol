// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./PFToken.sol";

contract PFBook is ERC721URIStorage {
    uint256 private _tokenIds;
    PFToken public poxToken;
    address public author;

    constructor(address _poxAddress, address _authorAddress) ERC721("PFBook", "PFB") {
        poxToken = PFToken(_poxAddress);
        author = _authorAddress;
    }

    function mintBook(address recipient, string memory tokenURI, uint amount) public returns (uint256) {
        require(poxToken.transferFrom(msg.sender, author, amount), "Token transfer failed!");

        _tokenIds++;

        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds;
    }
}
