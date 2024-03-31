'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { fetchBook } from '../utils/fetchBook'

const handleClick = async (e) => {
  e.preventDefault()
  const test = await fetchBook()
  console.log(test)
}

export default function Library() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const loadBooks = async () => {
      const fetchedBooks = await fetchBook()
      setBooks(fetchedBooks)
    }

    loadBooks()
  }, [])

  return (
    <div className='max-w-7xl mx-auto my-3 p-6 bg-[#f5f4f1] rounded-lg	'>
      <button className='bg-red-600' onClick={handleClick}>Test Fetch</button>
      <div className='flex'>
        <Image src="/library.png" width={28} height={28} />
        <h1 className='text-xl font-semibold ps-1 uppercase text-[#3b3c3d]'>Library</h1>
      </div>
      <div className='mt-3'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          {books.map((book, idx) => (
            <div key={idx} className='flex bg-[#b6ccd8] shadow-xl h-48 p-3 rounded'>
              <div className='w-auto h-full'>
                <img src="/test.jpg" alt="" className="h-full object-cover rounded" loading="lazy" />
              </div>
              <div className='flex-grow my-auto px-5'>
                <div className='flex items-center'>
                  <div style={{ width: '16px', height: '16px' }}>
                    <Image src='/book.png' width={16} height={16} />
                  </div>
                  <h1 className='text-lg font-semibold text-[#00668c] pl-1 uppercase'>{book.name}</h1>
                </div>
                <div className='flex my-3'>
                  <h1 className='text-base font-medium text-[#313d44] mr-auto'>{book.author}</h1>
                  {[...Array(5)].map((_, idx) => (
                    <div key={idx} style={{ width: '16px', height: '16px' }}>
                      <Image src='/star.png' width={16} height={16} />
                    </div>
                  ))}
                </div>
                <div className='h-px w-full bg-[#00668c]'></div>
                <p className='text-sm text-[#313d44] mt-3 mb-1'>Price</p>
                <div className='flex'>
                  <div style={{ width: '28px', height: '28px' }} className='rounded-full'>
                    <Image src='/pox.png' width={28} height={28} />
                  </div>
                  <p className='text-lg font-semibold text-[#00668c] ml-2'>1300</p> 
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}
