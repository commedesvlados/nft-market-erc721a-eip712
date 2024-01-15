// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Interfaces/INFTCollection.sol";



contract NFTMarketplace is EIP712, AccessControl {
    INFTCollection public nftContract;

    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    string private constant SIGNING_DOMAIN = "NFT-Marketplace-Domain";
    string private constant SIGNING_VERSION = "1";

    // nonce => bool
    mapping(uint256 => bool) private _nonce; // is used nonce

    event Redeemed(address indexed to, uint256 quantity);

    struct Offer {
        uint256 nonce;
        uint256 quantity;
        uint256 price;
        bytes signature;
    }

    constructor() EIP712(SIGNING_DOMAIN, SIGNING_VERSION) {
        _grantRole(OWNER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function redeem(address to, Offer calldata offer) public payable {
        address signer = _verify(offer);

        require(hasRole(MINTER_ROLE, signer), "Invalid signature");
        require(msg.value >= offer.price, "Insufficient funds");
        // prevent replay attack
        require(!_nonce[offer.nonce], "Already redeem");
        _nonce[offer.nonce] = true;

        nftContract.mint(to, offer.quantity);
        emit Redeemed(to, offer.quantity);
    }

    /// @return signer address
    function _verify(Offer calldata offer) internal view returns(address) {
        bytes32 hashed = _hashTypedDataV4(keccak256(abi.encode(
            keccak256("Offer(uint256 nonce,uint256 quantity,uint256 price)"),
            offer.nonce,
            offer.quantity,
            offer.price
        )));
        return ECDSA.recover(hashed, offer.signature);
    }

    /// @notice Withdraw ETH
    function withdraw() external onlyRole(OWNER_ROLE) {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Transfer Failed");
    }

    function setCollection(address collection) external onlyRole(OWNER_ROLE) {
        nftContract = INFTCollection(collection);
    }

    function checkNonce(uint256 nonce) public view returns(bool) {
        return _nonce[nonce];
    }
}
