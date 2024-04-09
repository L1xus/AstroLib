'use client'

import { getAccount, publicClient, walletClient } from './config'
import PFLibrary from '../artifacts/contracts/PFLibrary.sol/PFLibrary.json'
import { parseUnits } from 'viem'

export const deployBook = async (author: string, metadataHash: string, price: string) => {
  const account = await getAccount()
  const libraryAddress= "0x719De6c0f3F0B9B7895f381b0115B614a30857a7"
  const authorAddress = author
  const tokenUri = `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${metadataHash}`
  const mintPrice = parseUnits(price, 18)

  console.log('MiiiintPrice',mintPrice)

  try {
    const approvalRequest = await publicClient.simulateContract({
      account,
      address: libraryAddress,
      abi: PFLibrary.abi,
      functionName: 'addBook',
      args: [authorAddress, tokenUri, mintPrice]
    })
    const approvalHash = await walletClient.writeContract(approvalRequest.request)
    const receipt = await publicClient.waitForTransactionReceipt({hash: approvalHash}) 

    return receipt
  } catch (error) {
    console.error('shit adding book!', error)
    throw error
  }
}
