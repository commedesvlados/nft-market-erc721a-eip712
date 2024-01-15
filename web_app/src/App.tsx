import './css/App.css'
import {useAccount} from "wagmi";
import ConnectWallet from "./components/Wallet/ConnectWallet.tsx";
import Collection from "./components/Collection/Collection.tsx";
import Offers from "./components/Offer/Offers.tsx";



const App = () => {
    const { isConnected } = useAccount()

    return (
        <div>
            <ConnectWallet/>

            {isConnected
                ? <>
                    <Collection />
                    <Offers />
                </>
                : <div>Connect Wallet!</div>
            }
        </div>
    )
}

export default App
