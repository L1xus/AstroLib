'use client'

import { getAccount, publicClient, walletClient } from '/utils/config'
import PFLibrary from './artifacts/contracts/PFLibrary.sol/PFLibrary'
import { deployContract } from 'viem'

export default async function deploy() {
  const poxAddress = "0x7bEea9EAb0610008605ce9ad3C10BD2608646AB8" 
  const account = await getAccount()

  try{
    const hash = await walletClient.deployContract({
      abi: PFLibrary.abi,
      account: account,
      args: [poxAddress],
      bytecode: PFLibrary.bytecode,
    })

    const transaction = await publicClient.waitForTransactionReceipt({
      hash: hash
    })
    const contractAddress = transaction.contractAddress

    return contractAddress
  } catch (error) {
    console.error('shit!', error)
    throw error
  }
}
