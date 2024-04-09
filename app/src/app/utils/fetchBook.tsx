'use client'

import { getAccount, publicClient, walletClient } from './config'
import PFLibrary from '../artifacts/contracts/PFLibrary.sol/PFLibrary.json'

const fetchBookMetadata = async (tokenUri: string) => {
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
    const books: any[] = []
    const booksMetadata: any[] = []

    const totalBooks = await publicClient.readContract({
      address: libraryAddress,
      abi: PFLibrary.abi,
      functionName: 'totalBooks',
    })

    const totalBooksNumber = Number(totalBooks)

    console.log('totalBooks: ', totalBooksNumber)

    for (let i=1; i<=totalBooksNumber; i++) {
      const bookResponse = await publicClient.readContract({
        address: libraryAddress,
        abi: PFLibrary.abi,
        functionName: 'getBook',
        args: [i]
      })
      const book = Array.isArray(bookResponse) ? bookResponse : []
      books.push(book)

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
