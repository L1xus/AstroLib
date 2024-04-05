'use client'

import { getAccount, publicClient, walletClient } from './config'
import PFLibrary from '../artifacts/contracts/PFLibrary.sol/PFLibrary'

const fetchProfileMetadata = async (tokenUri) => {
  try {
    const metadata = await fetch(tokenUri)
    const metadataText = await metadata.text()

    return JSON.parse(metadataText)
  } catch (error) {
    console.error(`Error fetching book metadata: ${error}`)
    return null
  }
}

export const fetchProfile = async () => {
  try {
    const account = await getAccount()
    const libraryAddress= "0x719De6c0f3F0B9B7895f381b0115B614a30857a7"
    const mintedBooks = []
    const mintedBooksMetadata = []

    const ownedBooks = await publicClient.readContract({
      address: libraryAddress,
      abi: PFLibrary.abi,
      functionName: 'getOwnedBooks',
      args: [account]
    })

    for (let i=0; i<ownedBooks.length; i++) {
      let j = parseInt(ownedBooks[i])
      const book = await publicClient.readContract({
        address: libraryAddress,
        abi: PFLibrary.abi,
        functionName: 'tokenURI',
        args: [j]
      })
      mintedBooks.push(book)

      const metadataJson = await fetchProfileMetadata(mintedBooks[i])
      if (metadataJson) {
        mintedBooksMetadata.push(metadataJson)
      }
    }
    console.log('mintedBooks: ', mintedBooks)
    console.log('mintedBooksMetadata: ', mintedBooksMetadata)

    return { mintedBooks, mintedBooksMetadata }
  } catch (error) {
    console.error('shit getting book!', error)
    throw error
  }
}
