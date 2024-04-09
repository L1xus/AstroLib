'use client'

import { createWalletClient, custom, createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'
import 'viem/window'
 
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL)
})
 
let walletClient: any
if (typeof window !== 'undefined' && window.ethereum) {
  walletClient = createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum)
  })
}
export { walletClient }
//
// JSON-RPC Account
export const getAccount = async () => {
  if (!walletClient) {
    throw new Error('Wallet client is not initialized')
  }
  const [account] = await walletClient.getAddresses()
  return account
}
