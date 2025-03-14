import './App.css'
import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { sepolia, mainnet } from '@reown/appkit/networks'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Header } from './components/header/Header'
import { Home } from "./pages"
import icons from "./icons.json"

const projectId = "ff90ca3a23aaaaf5a5ee02df6bf92ff2"
const networks = [sepolia, mainnet]

createAppKit({
  themeMode: "light",
  adapters: [new EthersAdapter()],
  networks,
  projectId,
  defaultNetwork: sepolia,
  chainImages: {
    42161: icons.arbitrum,
    1: icons.ethereum,
    11155111: icons.ethereum
  },
  features: {
    analytics: true,
    connectMethodsOrder: ['wallet']
  }
})

function App() {
  return <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </Router>
  </>
}

export default App