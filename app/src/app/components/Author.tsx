'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export default function BookInfo() {
  const [formData, setFormData] = useState({
    authorName: '',
    wallet: '',
    bookTitle: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const deployBook = (e) => {
    e.preventDefault()
    console.log(formData)
    setFormData({
      authorName: '',
      wallet: '',
      bookTitle: ''
    })
  }

  return (
    <div className='max-w-7xl mx-auto my-3 p-6 bg-[#f5f4f1] rounded-lg	'>
      <div className='bg-[#b6ccd8] shadow-xl p-6 rounded'>
        <form onSubmit={deployBook}>
          <h1 className='text-2xl font-semibold text-[#00668c] pl-1 uppercase'>Your Information</h1>
          <div className='grid grid-cols-2 gap-4'>
            <div className='p-2'>
              
              <label htmlFor='authorName' className='block text-[#1d1c1c]'>Author Name:</label>
              <div className='items-center flex flex-row rounded bg-[#ebebeb] my-2'>
                <input 
                  type='text' 
                  name='authorName' 
                  placeholder=' Author Name'
                  value={formData.authorName} 
                  onChange={handleChange} 
                  className='h-9 w-full px-3 bg-inherit rounded outline-none focus:ring-1 focus:ring-[#00668c] hover:ring-1'
                  required 
                />
              </div>

              <label htmlFor='bookTitle' className='block text-[#1d1c1c]'>Book Title:</label>
              <div className='items-center flex flex-row rounded bg-[#ebebeb] my-2'>
                <input 
                  type='text' 
                  name='bookTitle' 
                  placeholder='Title'
                  value={formData.bookTitle} 
                  onChange={handleChange} 
                  className='h-9 w-full px-3 bg-inherit rounded outline-none focus:ring-1 focus:ring-[#00668c] hover:ring-1'
                  required 
                />
              </div>

            </div>
            <div className='p-2'>

              <label htmlFor='wallet' className='block text-[#1d1c1c]'>Wallet:</label>
              <div className='items-center flex flex-row rounded bg-[#ebebeb] my-2'>
                <input 
                  type='text' 
                  name='wallet' 
                  placeholder='0x...'
                  value={formData.wallet} 
                  onChange={handleChange} 
                  className='h-9 w-full px-3 bg-inherit rounded outline-none focus:ring-1 focus:ring-[#00668c] hover:ring-1'
                  required 
                />
              </div>

              <label htmlFor='pages' className='block text-[#1d1c1c]'>Pages:</label>
              <div className='items-center flex flex-row rounded bg-[#ebebeb] my-2'>
                <input 
                  type='number' 
                  name='pages' 
                  placeholder='Number of Pages'
                  value={formData.pages} 
                  onChange={handleChange} 
                  className='h-9 w-full px-3 bg-inherit rounded outline-none focus:ring-1 focus:ring-[#00668c] hover:ring-1'
                  required 
                />
              </div>
            </div>
          </div>
        </form>
     </div>
    </div>
      
  )
} 
