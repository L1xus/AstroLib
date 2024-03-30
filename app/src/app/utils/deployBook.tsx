'use client'

import { getAccount, publicClient, walletClient } from './config'
import PFLibrary from '../artifacts/contracts/PFLibrary.sol/PFLibrary'

export const deployBook = async (author, metadataHash) => {
  const account = await getAccount()
  const libraryAddress= "0xca0D7896EA09bc72cA491E4c0DC3f1d7eebEaBA3"
  const authorAddress = author
  const tokenUri = `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${metadataHash}`

  try {
    const approvalRequest = await publicClient.simulateContract({
      account,
      address: libraryAddress,
      abi: PFLibrary.abi,
      functionName: 'addBook',
      args: [authorAddress, tokenUri]
    })
    const approvalHash = await walletClient.writeContract(approvalRequest.request)
    const receipt = await publicClient.waitForTransactionReceipt({hash: approvalHash}) 

    return receipt
  } catch (error) {
    console.error('shit adding book!', error)
    throw error
  }
}
