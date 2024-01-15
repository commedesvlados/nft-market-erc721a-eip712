import { ethers } from "hardhat";

import {MARKETPLACE_CONTRACT_ADDRESS} from "../offerSignData";
const BASE_URI = "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/"

async function main() {
	const collection = await ethers.deployContract(
		"NFTCollection",
		[MARKETPLACE_CONTRACT_ADDRESS, BASE_URI]
	);

	await collection.waitForDeployment();

	console.log(`NFTCollection deployed to ${collection.target}`);
	console.log(`Transaction: https://sepolia.etherscan.io/address/${collection.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
