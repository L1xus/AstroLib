'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { fetchProfile } from '../utils/fetchProfile.tsx'

export default function Profile() {
  const [books, setBooks] = useState([])
  const [booksMetadata, setBooksMetadata] = useState([])

  useEffect(() => {
    const loadBooks = async () => {
      const { mintedBooks, mintedBooksMetadata } = await fetchProfile()
      setBooks(mintedBooks)
      setBooksMetadata(mintedBooksMetadata)
    }

    loadBooks()
  }, [])

  return (
    <div className='max-w-7xl mx-auto my-3 p-6 bg-[#f5f4f1] rounded-lg'>
      <h1 className='text-xl font-semibold ps-1 uppercase text-[#00668c]'>Profile</h1>
      <div className='flex'>
        {booksMetadata.map((book, idx) => (
          <div key={idx} className='flex flex-col items-center justify-center shadow-xl rounded p-3 m-3 bg-[#b6ccd8]'>
            <div className='flex items-center'>
              <div style={{ width: '16px', height: '16px' }}>
                <Image src='/book.png' width={16} height={16} />
              </div>
              <h1 className='text-lg font-semibold text-[#00668c] pl-1 uppercase'>{book.name}</h1>
            </div>
            <div className='w-auto h-72'>
              <img src={
                `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${booksMetadata[idx] && booksMetadata[idx].image ? booksMetadata[idx].image : ''}`}
                alt="" className="h-full object-cover rounded" loading="lazy" />
            </div>
            <Link href={`/profile/reading/${encodeURIComponent(book.ipfsHash)}`}>
              <button className='m-1 p-2 w-full text-md font-semibold text-[#f5f4f1] bg-[#fe7e01] rounded hover:bg-[#f19132]'>
                Read Book
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
