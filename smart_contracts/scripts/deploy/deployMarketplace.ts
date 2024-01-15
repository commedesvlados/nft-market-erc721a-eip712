import { ethers } from "hardhat";

async function main() {
	const marketplace = await ethers.deployContract("NFTMarketplace", []);

	await marketplace.waitForDeployment();

	console.log(`Deployed to ${marketplace.target}`);
	console.log(`Transaction: https://sepolia.etherscan.io/address/${marketplace.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
