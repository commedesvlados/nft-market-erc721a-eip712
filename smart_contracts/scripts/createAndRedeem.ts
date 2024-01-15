import { ethers } from "hardhat";
import {domain, MARKETPLACE_CONTRACT_ADDRESS, NFT_PRICE, types} from "./offerSignData";

const redeemOneNFT = async () => {
	const [signer, ] = await ethers.getSigners();

	const nftMarketplace = await ethers.getContractAt("NFTMarketplace", MARKETPLACE_CONTRACT_ADDRESS);

	const offerData = {
		nonce: 0,
		quantity: 1,
		price: Number(NFT_PRICE),
	}
	const signedOfferData = await signer.signTypedData(domain, types, offerData);
	const offer = {
		nonce: 0,
		quantity: 1,
		price: Number(NFT_PRICE),
		signature: signedOfferData,
	};

	console.log("Call contract...");

	const txn = await nftMarketplace.redeem(signer.address, offer, {
		value: NFT_PRICE
	});
	const receipt = await txn.wait(1);
	console.log("receipt", receipt)
}

redeemOneNFT().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});