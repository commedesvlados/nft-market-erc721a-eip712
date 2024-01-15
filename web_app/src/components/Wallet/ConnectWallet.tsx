import {useAccount} from "wagmi";
import Account from "./Account.tsx";
import WalletOptions from "./WalletOptions.tsx";


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

