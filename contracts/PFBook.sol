// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PFBook is ERC721URIStorage {
    uint256 private _tokenIds;

    constructor() ERC721("PFBook", "PFB") {}

    function mintNFT(address recipient, string memory tokenURI) public returns (uint256) {
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
