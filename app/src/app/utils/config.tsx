'use client'

import { createWalletClient, custom, createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'
 
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http()
})
 
let walletClient
if (typeof window !== 'undefined') {
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
//export const [account] = await walletClient.getAddresses()
