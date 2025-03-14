import styles from "./Home.module.css"
import { useEffect, useState } from "react"
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { BrowserProvider, Contract } from 'ethers'
import storageArtifact from "../../contracts/storage.json"

export function Home() {
    const { isConnected } = useAppKitAccount()
    const { walletProvider } = useAppKitProvider('eip155')
    const [contract, setContract] = useState({})
    const [storedNumber, setStoredNumber] = useState(null)
    const [number, setNumber] = useState(0)

    const retrieve = async () => {
        try {
            const number = await contract.retrieve()
            setStoredNumber(number)
        } catch (error) {
            console.error("Error: ", error)
        }
    }

    const store = async (e) => {
        e.preventDefault()

        try {
            const tx = await contract.store(number)
            await tx.wait()
            await retrieve()
        } catch (error) {
            console.error("Error: ", error)
        }
    }
  
    useEffect(() => {
        const loadContract = async () => {
            const provider = new BrowserProvider(walletProvider)
            const signer = await provider.getSigner()

            const storageContract = new Contract(
                storageArtifact.address, 
                storageArtifact.abi, 
                signer
            )

            setContract(storageContract)
        }

        if(isConnected) {
            loadContract()
        }
    }, [walletProvider])

    useEffect(() => {
        if(contract) {
            retrieve()
        }
    }, [contract])

    return (
        <div className={styles["home"]}>
            <div className={styles["container"]}>
                {
                    isConnected ? <>
                        <div className={styles["retrieve-block"]}>
                            <div className={styles["retrieve-number"]}>{storedNumber == null ? "Loading..." : `Number: ${storedNumber.toString()}`}</div>
                            <button className={styles["retrieve-button"]} onClick={retrieve}>Retrieve</button>
                        </div>
                        <form className={styles["store-form"]}>
                            <input onChange={(e) => setNumber(e.target.value)} className={styles["store-input"]} type="number" name="store-input" id="store-input" />
                            <button className={styles["store-button"]} onClick={store}>Store</button>
                        </form>
                    </> : 
                    <div className={styles["connect-message"]}>Pleaes, connect your wallet</div>
                }
            </div>
        </div>
    )
}