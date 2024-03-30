'use client'

import { getAccount, publicClient, walletClient } from './config'
import PFLibrary from '../artifacts/contracts/PFLibrary.sol/PFLibrary'

export const fetchBook = async () => {
  const account = await getAccount()
  const libraryAddress= "0xca0D7896EA09bc72cA491E4c0DC3f1d7eebEaBA3"
  //const authorAddress = author
  //const tokenUri = `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${metadataHash}`
  const booksTokenUri = []

  try {
    const totalBooks = await publicClient.readContract({
      address: libraryAddress,
      abi: PFLibrary.abi,
      functionName: 'totalBooks',
    })

    for (let i=1; i<=totalBooks; i++) {
      const book = await publicClient.readContract({
        address: libraryAddress,
        abi: PFLibrary.abi,
        functionName: 'getBook',
        args: [i]
      })
      booksTokenUri.push(book)
    }

  } catch (error) {
    console.error('shit adding book!', error)
    throw error
  }
}
