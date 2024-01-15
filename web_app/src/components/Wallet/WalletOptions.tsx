import React, {useState} from "react";
import {useEffect} from "react";
import { Connector, useConnect } from 'wagmi'
import {Button} from "reactstrap";

const WalletOptions = () => {
	const { connectors, connect } = useConnect();

	return connectors.map((connector) => (
		<WalletOption
			key={connector.uid}
			connector={connector}
			onClick={() => connect({ connector })}
		/>
	));
}

interface IWalletOption {
	connector: Connector;
	onClick: () => void;
}
const WalletOption = ({connector, onClick}: IWalletOption) => {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		(async () => {
			const provider = await connector.getProvider();
			setReady(!!provider);
		})()
	}, [connector]);

	return (
		<Button
			color="primary"
			disabled={!ready}
			onClick={onClick}
		>
			{connector.name}
		</Button>
	);
}

export default WalletOptions;
