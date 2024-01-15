// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface INFTCollection {
    function mint(address to, uint256 quantity) external;
}
