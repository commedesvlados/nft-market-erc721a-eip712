import fs from "fs";
import path from "path";
import { ethers } from "hardhat";
import {domain, NFT_PRICE, types} from "./offerSignData";

const TOTAL_NFT_OFFERS = 100;

const createOffers = async () => {
	const [signer] = await ethers.getSigners(); // signer is a minter

	let offers = [];

	for (let i = 0; i <= TOTAL_NFT_OFFERS; i++) {
		let offerData = {
			nonce: i,
			quantity: 1,
			price: Number(NFT_PRICE),
		}
		let signedOfferData = await signer.signTypedData(domain, types, offerData);
		let offer = {
			nonce: i,
			quantity: 1,
			price: Number(NFT_PRICE),
			signature: signedOfferData,
		}
		offers.push(offer);
	}

	try {
		fs.writeFileSync(path.join(__dirname, '/Offers.json'), JSON.stringify(offers));
		console.log('Offers Created');
	} catch (error) {
		console.log(error);
	}
}

createOffers().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});