import './App.css'
import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { arbitrum, mainnet } from '@reown/appkit/networks'
import ConnectButton from './components/connectButton/ConnectButton'
import icons from "./icons.json"

const projectId = "ff90ca3a23aaaaf5a5ee02df6bf92ff2"
const networks = [arbitrum, mainnet]

createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  projectId,
  chainImages: {
    42161: icons.arbitrum,
    1: icons.ethereum
  },
  features: {
    analytics: true,
    connectMethodsOrder: ['wallet']
  }
})

function App() {
  return <ConnectButton />
}

export default App