'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { fetchBook } from '../utils/fetchBook'

export default function BookInfo({ index }) {
  const [book, setBook] = useState([])
  const [bookMetadata, setBookMetadata] = useState([])

  console.log('index: ', index)

  useEffect(() => {
    const loadBooks = async () => {
      const { books, booksMetadata } = await fetchBook()
      setBook(books)
      setBookMetadata(booksMetadata)
    }

    loadBooks()
  }, [])

  const coverCid = bookMetadata[0] && bookMetadata[0].image ? bookMetadata[0].image : ''
  console.log(coverCid)
  const coverImage = `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${coverCid}`

  return (
    <div className='max-w-7xl mx-auto my-3 p-6 bg-[#f5f4f1] rounded-lg	'>
      <div className='md:flex bg-[#b6ccd8] shadow-xl p-6 rounded'>
        <div className='w-auto h-full'>
          <img src={coverImage} alt="" width={280} height={380} className="object-cover rounded" loading="lazy" />
        </div>
        <div className='flex-grow my-auto px-5'>
          <div className='flex items-center'>
            <div style={{ width: '16px', height: '16px' }}>
              <Image src='/book.png' width={16} height={16} />
            </div>
            <h1 className='text-2xl font-semibold text-[#00668c] pl-1 uppercase'>
              {bookMetadata[0] && bookMetadata[0].name ? bookMetadata[0].name : 'S3aid olbri9'}
            </h1>
          </div>
          <div className='flex my-3'>
            <p>
              {bookMetadata[0] && bookMetadata[0].description ? bookMetadata[0].description : ''}
            </p>  
          </div>
          <table>
            <tbody>
              <tr>
                <td className="pr-12 py-2">Minted Books</td>
                <td className="pr-12 py-2">
                  {book[0] && book[0][3] ? book[0][3].toString() : ''}
                </td>
              </tr>
              <tr>
                <td className="pr-12 py-2">Price</td>
              </tr>
              <tr>
                <td className="pr-12 py-2">
                  <div className='flex'>
                    <div style={{ width: '28px', height: '28px' }} className='rounded-full'>
                      <Image src='/pox.png' width={28} height={28} />
                    </div>
                    <p className='text-lg font-semibold text-[#00668c] ml-2'>
                      {book[0] && book[0][2] ? (BigInt(book[0][2]) / 10n**18n).toString() : '----'}
                    </p> 
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className='my-3 mx-auto'>
            <button className='px-12 py-2 rounded text-[#00668c] font-semibold border-2 border-[#00668c]'>Mint Book</button>
          </div>
        </div>
      </div>
      <div className='py-6 px-[30%]'>
        <h1 className='text-xl font-bold text-[#00668c] pl-1 uppercase'>About Book</h1>
        <table className='w-full mt-3'>
          <tbody>
            <tr>
              <td className="pr-[30%] py-2">Book ID</td>
              <td className="py-2">490eb813-9...19a34f68f8</td>
            </tr>
            <tr>
              <td className="pr-12 py-2">Publication Date</td>
              <td className="py-2">5/03/2024</td>
            </tr>
            <tr>
              <td className="pr-12 py-2">Category</td>
              <td className="py-2">
                {bookMetadata[0] && bookMetadata[0].attributes ? 
                  bookMetadata[0].attributes.map((attribute, index) => {
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
                {bookMetadata[0] && bookMetadata[0].attributes ? 
                  bookMetadata[0].attributes.map((attribute, index) => {
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
                {bookMetadata[0] && bookMetadata[0].attributes ? 
                  bookMetadata[0].attributes.map((attribute, index) => {
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
              <td className="pr-[30%] py-2">Astro</td>
            </tr>
            <tr>
              <td className="pr-12 py-2">Wallet Address</td>
              <td className="py-2">0xeBd65E2c...1Dec9fa3D5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
      
  )
}
