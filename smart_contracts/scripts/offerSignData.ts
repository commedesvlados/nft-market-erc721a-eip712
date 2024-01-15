import {ethers} from "hardhat";

const SIGNING_DOMAIN = "NFT-Marketplace-Domain";
const SIGNING_VERSION = "1";
export const MARKETPLACE_CONTRACT_ADDRESS = "0x9a1d89B3A0e3369AF9dd30e4913bE91d4Ee14dB4"; // TODO change address
const SEPOLIA_CHAIN_ID = 11155111;

export const NFT_PRICE = ethers.parseEther("0.00001");

export const domain = {
	name: SIGNING_DOMAIN,
	version: SIGNING_VERSION,
	verifyingContract: MARKETPLACE_CONTRACT_ADDRESS,
	chainId: SEPOLIA_CHAIN_ID,
};

export const types = {
	Offer:[
		{name: "nonce", type:"uint256"},
		{name: "quantity", type:"uint256"},
		{name: "price", type:"uint256"},
	]
};