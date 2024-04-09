'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { fetchBook } from '../utils/fetchBook'
import { shortAddress } from '../utils/shortAddress'
import { mintBook } from '../utils/mintBook'
import { formatUnits } from 'viem'

interface BookInfoProps {
  index: number
}

interface Attribute {
 trait_type: string;
 value: string;
}

export default function BookInfo({ index }: BookInfoProps) {
  const [book, setBook] = useState<any[]>([])
  const [bookMetadata, setBookMetadata] = useState<any[]>([])
  const [btnMessage, setBtnMessage] = useState<string>('Mint Book')
  const idx = index

  console.log('index: ', idx)

  useEffect(() => {
    const loadBooks = async () => {
      const { books, booksMetadata } = await fetchBook()
      setBook(books)
      setBookMetadata(booksMetadata)
    }

    loadBooks()
  }, [])

  const coverCid = bookMetadata[idx] && bookMetadata[idx].image ? bookMetadata[idx].image : ''
  const coverImage = `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${coverCid}`

  const bookIndex = idx + 1
  const mintPrice = book[idx] && book[idx][2] ? (formatUnits(book[idx][2], 18)).toString() : '----'

  const handleMintBook = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const onMessage = (message: string) => {
        setBtnMessage(message)
        console.log(message)
      }
      const mintedBook = await mintBook(bookIndex, mintPrice, onMessage)
      console.log(mintedBook)
    } catch (error) {
      console.error('Error Minting Book!:', error)
      
    }
  }

  return (
    <div className='max-w-7xl mx-auto my-3 p-6 bg-[#f5f4f1] rounded-lg	'>
      <div className='md:flex bg-[#b6ccd8] shadow-xl p-6 rounded'>
        <div className='w-auto h-full'>
          <img src={coverImage} alt="" width={280} height={380} className="object-cover rounded" loading="lazy" />
        </div>
        <div className='flex-grow my-auto px-5'>
          <div className='flex items-center'>
            <div style={{ width: '16px', height: '16px' }}>
              <Image src='/book.png' width={16} height={16} alt="" />
            </div>
            <h1 className='text-2xl font-semibold text-[#00668c] pl-1 uppercase'>
              {bookMetadata[idx] && bookMetadata[idx].name ? bookMetadata[idx].name : 'loading...'}
            </h1>
          </div>
          <div className='flex my-3'>
            <p>
              {bookMetadata[idx] && bookMetadata[idx].description ? bookMetadata[idx].description : ''}
            </p>  
          </div>
          <table>
            <tbody>
              <tr>
                <td className="pr-12 py-2">Minted Books</td>
                <td className="pr-12 py-2">
                  {book[idx] && book[idx][3] ? book[idx][3].toString() : '0'}
                </td>
              </tr>
              <tr>
                <td className="pr-12 py-2">Price</td>
              </tr>
              <tr>
                <td className="pr-12 py-2">
                  <div className='flex'>
                    <div style={{ width: '28px', height: '28px' }} className='rounded-full'>
                      <Image src='/pox.png' width={28} height={28} alt="" />
                    </div>
                    <p className='text-lg font-semibold text-[#00668c] ml-2'>
                      {book[idx] && book[idx][2] ? (formatUnits(book[idx][2], 18)).toString() : '----'}
                    </p> 
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className='my-3 mx-auto'>
            <button className='px-12 py-2 rounded text-[#00668c] font-semibold border-2 border-[#00668c] hover:bg-[#00668c] hover:text-[#f5f4f1]' onClick={handleMintBook}>{btnMessage}</button>
          </div>
        </div>
      </div>
      <div className='py-6 px-[30%]'>
        <h1 className='text-xl font-bold text-[#00668c] pl-1 uppercase'>About Book</h1>
        <table className='w-full mt-3'>
          <tbody>
            <tr>
              <td className="pr-[30%] py-2">Book ID</td>
              <td className="py-2">{idx + 1}</td>
            </tr>
            <tr>
              <td className="pr-12 py-2">Publication Date</td>
              <td className="py-2">5/03/2024</td>
            </tr>
            <tr>
              <td className="pr-12 py-2">Category</td>
              <td className="py-2">
                {bookMetadata[idx] && bookMetadata[idx].attributes ? 
                  bookMetadata[idx].attributes.map((attribute: Attribute, index: number) => {
                    if (attribute.trait_type === "Category") {
                      return (
                        <p key={index}>{attribute.value}</p>
                      );
                    }
                    return null
                  })
                : ''}
              </td>
            </tr>
            <tr>
              <td className="pr-12 py-2">Language</td>
              <td className="py-2">
                {bookMetadata[idx] && bookMetadata[idx].attributes ? 
                  bookMetadata[idx].attributes.map((attribute: Attribute, index: number) => {
                    if (attribute.trait_type === "Language") {
                      return (
                        <p key={index}>{attribute.value}</p>
                      );
                    }
                    return null
                  })
                : ''}
              </td>
            </tr>
            <tr>
              <td className="pr-12 py-2">Pages</td>
              <td className="py-2">
                {bookMetadata[idx] && bookMetadata[idx].attributes ? 
                  bookMetadata[idx].attributes.map((attribute: Attribute, index: number) => {
                    if (attribute.trait_type === "Pages") {
                      return (
                        <p key={index}>{attribute.value}</p>
                      );
                    }
                    return null
                  })
                : ''}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='px-[30%]'>
        <h1 className='text-xl font-bold text-[#00668c] pl-1 uppercase'>Auhtor Information</h1>
        <table className='w-full mt-3'>
          <tbody>
            <tr>
              <td className="pr-[30%] py-2">
                {bookMetadata[idx] && bookMetadata[idx].author ? bookMetadata[idx].author : ''}
              </td>
            </tr>
            <tr>
              <td className="pr-12 py-2">Wallet Address</td>
              <td className="py-2">
                {book[idx] && book[idx][0] ? (
                  <Link href={`https://sepolia.etherscan.io/address/${book[idx][0]}`} target="_blank" rel="noopener noreferrer">
                    {shortAddress(book[idx][0])}
                  </Link>
                ) : (
                  '----'
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
      
  )
}
