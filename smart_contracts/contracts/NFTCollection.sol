// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";



contract NFTCollection is AccessControl, ERC721A {
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE"); // Marketplace

    string private _baseTokenURI;

    /// @param minter is marketplace contract address
    /// @param uri of collection
    constructor(address minter, string memory uri)
        ERC721A("NFTCollection", "NFTC")
    {
        _grantRole(OWNER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, minter);

        _baseTokenURI = uri;
    }

    function mint(address to, uint256 quantity) external onlyRole(MINTER_ROLE) {
        _safeMint(to, quantity);
    }

    // URI
    function setBaseURI(string calldata uri) external onlyRole(OWNER_ROLE) {
        _baseTokenURI = uri;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function baseURI() public view returns (string memory) {
        return _baseTokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        string memory uri = _baseURI();
        return bytes(uri).length != 0 ? string(abi.encodePacked(uri, _toString(tokenId), '.png')) : '';
    }

    //
    function supportsInterface(bytes4 interfaceId) public view virtual override (AccessControl, ERC721A) returns (bool) {
        return ERC721A.supportsInterface(interfaceId) || AccessControl.supportsInterface(interfaceId);
    }
}