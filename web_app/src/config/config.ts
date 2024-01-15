import { http, createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;
const infuraApiKey = import.meta.env.VITE_INFURA_API_KEY;

export const config = createConfig({
	chains: [sepolia],
	connectors: [walletConnect({projectId}),],
	transports: {
		[sepolia.id]: http(`https://sepolia.infura.io/v3/${infuraApiKey}`),
	},
});


