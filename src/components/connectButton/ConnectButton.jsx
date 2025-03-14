import styles from "./ConnectButton.module.css"
import { useAppKit } from '@reown/appkit/react'
import { useAppKitNetwork } from "@reown/appkit/react"
import { useAppKitAccount } from "@reown/appkit/react"
import icons from "../../icons.json"

export default function ConnectButton() {
  const { open } = useAppKit()
  const { chainId } = useAppKitNetwork()
  const { address, isConnected } = useAppKitAccount()

  function renderNetwork() {
    if (chainId == 1) {
      return "Ethereum"
    } else {
      return "Sepolia"
    }
  }

  // function renderIcon() {
  //   if (chainId == 1) {
  //     return icons.ethereum
  //   } else {
  //     return icons.arbitrum
  //   }
  // }

  function renderAccount() {
    if(isConnected) {
      return shortenAddress(address)
    } else {
      return "Connect Wallet"
    }
  }

  function shortenAddress(addressStr) {
    return addressStr.slice(0, 4) + "..." + addressStr.slice(-4);
  }

  return (
    <div className={styles["connect"]}>
      <button className={styles["network-button"]} onClick={() => open({ view: 'Networks' })}>
        <div className={styles["icon"]}>
          <img src={icons.ethereum} alt="Chain Icon" />
        </div>
        <div className={styles["network-name"]}>{renderNetwork()}</div>
      </button>
      <button className={styles["connect-button"]} onClick={() => open()}>{renderAccount()}</button>
    </div>
  )
}