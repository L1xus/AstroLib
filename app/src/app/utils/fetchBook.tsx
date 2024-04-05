'use client'

import { getAccount, publicClient, walletClient } from './config'
import PFLibrary from '../artifacts/contracts/PFLibrary.sol/PFLibrary'

const fetchBookMetadata = async (tokenUri) => {
  try {
    const metadata = await fetch(tokenUri)
    const metadataText = await metadata.text()

    return JSON.parse(metadataText)
  } catch (error) {
    console.error(`Error fetching book metadata: ${error}`)
    return null
  }
}

export const fetchBook = async () => {
  try {
    const account = await getAccount()
    const libraryAddress= "0x719De6c0f3F0B9B7895f381b0115B614a30857a7"
    const books = []
    const booksMetadata = []

    const totalBooks = await publicClient.readContract({
      address: libraryAddress,
      abi: PFLibrary.abi,
      functionName: 'totalBooks',
    })

    console.log('totalBooks: ', totalBooks)

    for (let i=1; i<=totalBooks; i++) {
      const book = await publicClient.readContract({
        address: libraryAddress,
        abi: PFLibrary.abi,
        functionName: 'getBook',
        args: [i]
      })
      books.push(book)
      console.log('boooooooook',book.length)

      const metadataJson = await fetchBookMetadata(book[1])
      if (metadataJson) {
        booksMetadata.push(metadataJson)
      }
    }

    return { books, booksMetadata }
  } catch (error) {
    console.error('shit adding book!', error)
    throw error
  }
}
