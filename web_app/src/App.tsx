import React from "react";
import './css/App.css'
import ConnectWallet from "./components/Wallet/ConnectWallet.tsx";
import Collection from "./components/Collection/Collection.tsx";
import Offers from "./components/Offer/Offers.tsx";
import {useAccount} from "wagmi";



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
