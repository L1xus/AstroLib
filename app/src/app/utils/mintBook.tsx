'use client'

import { getAccount, publicClient, walletClient } from './config'
import PFLibrary from '../artifacts/contracts/PFLibrary.sol/PFLibrary.json'
import PFToken from '../artifacts/contracts/PFToken.sol/PFToken.json'
import { parseEther, parseUnits, formatEther, formatUnits } from 'viem'

export const mintBook = async (index: number, mintPrice: string, onMessage: (message: string) => void) => {
  const account = await getAccount()
  const libraryAddress= "0x719De6c0f3F0B9B7895f381b0115B614a30857a7"
  const poxAddress = "0x7bEea9EAb0610008605ce9ad3C10BD2608646AB8"

  try {
    onMessage("Approving...")
    const approvalAmount = parseUnits(mintPrice, 18)
    const approvalRequest = await publicClient.simulateContract({
      account,
      address: poxAddress,
      abi: PFToken.abi,
      functionName: 'approve',
      args: [libraryAddress, approvalAmount]
    })
    const approvalHash = await walletClient.writeContract(approvalRequest.request)
    await publicClient.waitForTransactionReceipt({hash: approvalHash}) 

    onMessage("Minting...")
    const mintRequest = await publicClient.simulateContract({
      account,
      address: libraryAddress,
      abi: PFLibrary.abi,
      functionName: 'mintBook',
      args: [index, account]
    })
    const mintHash = await walletClient.writeContract(mintRequest.request)
    const receipt = await publicClient.waitForTransactionReceipt({hash: mintHash}) 

    onMessage("Mint Book")
    return receipt
  } catch (error) {
    console.error('shit minting book!', error)
    throw error
  }
}
