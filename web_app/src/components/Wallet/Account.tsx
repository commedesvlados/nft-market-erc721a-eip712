import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import {Button} from "reactstrap";

export const Account = () => {
	const { address } = useAccount();
	const { disconnect } = useDisconnect();
	const { data: ensName } = useEnsName({ address });
	const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

	return (
		<div>
			{ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
			{address && <div>{ensName ? `${ensName} (${address})` : address}</div>}

			<Button
				color="primary"
				onClick={() => disconnect()}
			>
				Disconnect
			</Button>
		</div>
	)
}

export default Account;