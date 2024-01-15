import { ethers } from "hardhat";
import {MARKETPLACE_CONTRACT_ADDRESS} from "../offerSignData";

const COLLECTION_CONTRACT_ADDRESS = "0x7070fd0E637Db6B0172C0eEc0D9c215223C33183";

async function main() {
	const marketplace = await ethers.getContractAt("NFTMarketplace", MARKETPLACE_CONTRACT_ADDRESS);

	// Set Collection
	const txn = await marketplace.setCollection(COLLECTION_CONTRACT_ADDRESS); // COLLECTION_CONTRACT_ADDRESS
	const receipt = await txn.wait(1);
	console.log("receipt", receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
