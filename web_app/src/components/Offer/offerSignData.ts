const SIGNING_DOMAIN = "NFT-Marketplace-Domain";
const SIGNING_VERSION = "1";
const MARKETPLACE_CONTRACT_ADDRESS = import.meta.env.VITE_MARKET_CONTRACT_ADDRESS;
const SEPOLIA_CHAIN_ID = import.meta.env.VITE_SUPPORTED_CHAIN_ID;

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