import { createWalletClient, custom, createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'
 
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http()
})
 
export const walletClient = createWalletClient({
  chain: sepolia,
  transport: custom(window.ethereum)
})
 
// JSON-RPC Account
export const getAccount = async () => {
 const [account] = await walletClient.getAddresses()
 return account
}
//export const [account] = await walletClient.getAddresses()
