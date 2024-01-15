import React from 'react';
import {useAccount, useChainId, useSwitchChain} from "wagmi";
import Account from "./Account.tsx";
import WalletOptions from "./WalletOptions.tsx";
import {sepolia} from "wagmi/chains";
import {Button} from "reactstrap";

const ConnectWallet = () => {
	const { isConnected } = useAccount();
	// const { switchChain } = useSwitchChain();
	// const chainId = useChainId();

	if (isConnected) {
		// if(chainId === sepolia.id) {
			return <Account />
		// } else {
		// 	<Button
		// 		color="error"
		// 		onClick={() => switchChain({ chainId: sepolia.id })}
		// 	>
		// 		Switch to sepolia
		// 	</Button>
		// }
	}

	return <WalletOptions/>
};

export default ConnectWallet;

