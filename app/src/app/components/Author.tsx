'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export default function BookInfo() {
  const [formData, setFormData] = useState({
    authorName: '',
    wallet: '',
    bookTitle: '',
    pages: '',
    description: '',
    category: '',
    language: '',
    price: '',
    coverImage: null,
    book: null
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
  }

  const handleCoverImage = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      setFormData(prevState => ({
        ...prevState,
        coverImage: file,
        coverImagePreview: reader.result
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleBook = (e) => {
    const file = e.target.files[0]
    setFormData(prevState => ({
      ...prevState,
      book: file
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
          <h1 className='text-2xl font-semibold text-[#00668c] pl-1 uppercase'>Informations</h1>
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
                  placeholder='Wallet to recieve mint fund'
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

          <div className='grid px-2'>
            <label htmlFor='description' className='block text-[#1d1c1c]'>Description:</label>
            <div className='items-center flex flex-row rounded bg-[#ebebeb] my-2'>
              <textarea 
                  id='description' 
                  name='description' 
                  placeholder='Write a Description for your book...'
                  value={formData.description} 
                  onChange={handleChange} 
                  className='w-full px-3 py-1 bg-inherit rounded outline-none focus:ring-1 focus:ring-[#00668c] hover:ring-1'
                  rows={4}
                  required 
                ></textarea>
            </div>
          </div>

          <div className='grid grid-cols-3 gap-4'>
            <div className='p-2'>
              <label htmlFor='bookTitle' className='block text-[#1d1c1c]'>Category:</label>
              <div className='items-center flex flex-row rounded bg-[#ebebeb] my-2'>
                <input 
                  type='text' 
                  name='bookTitle' 
                  placeholder='Domaining, Crypto, Adsense...'
                  value={formData.category} 
                  onChange={handleChange} 
                  className='h-9 w-full px-3 bg-inherit rounded outline-none focus:ring-1 focus:ring-[#00668c] hover:ring-1'
                  required 
                />
              </div>
            </div>

            <div className='p-2'>
              <label htmlFor='pages' className='block text-[#1d1c1c]'>Language:</label>
              <div className='items-center flex flex-row rounded bg-[#ebebeb] my-2'>
                <select 
                  name='language' 
                  value={formData.language} 
                  onChange={handleChange} 
                  required 
                  className='w-full px-3 py-2 cursor-pointer rounded outline-none focus:ring-1 focus:ring-[#00668c] hover:ring-1'
                >
                  <option value='English'>English</option>
                  <option value='Arabic'>Arabic</option>
                  <option value='Frensh'>Frensh</option>
                </select>
              </div>
            </div>

            <div className='p-2'>
              <label htmlFor='pages' className='block text-[#1d1c1c]'>Price:</label>
              <div className='items-center flex flex-row rounded bg-[#ebebeb] my-2'>
                <input 
                  type='number' 
                  name='price' 
                  placeholder='Price in $POX'
                  value={formData.pages} 
                  onChange={handleChange} 
                  className='h-9 w-full px-3 bg-inherit rounded outline-none focus:ring-1 focus:ring-[#00668c] hover:ring-1'
                  required 
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='p-2'>
              <label htmlFor='coverImg' className='block text-[#1d1c1c]'>Cover Image:</label>
              <div className='flex justify-center'>
                <label htmlFor='coverImage' className='h-80 w-[250px] my-2 flex items-center justify-center bg-[#ebebeb] cursor-pointer rounded outline-none focus:ring-1 focus:ring-[#00668c] hover:ring-1'>
                  {formData.coverImagePreview ? (
                    <Image src={formData.coverImagePreview} width={250} height={320} />
                  ) : (
                    <Image src="/plus.png" width={20} height={20} />
                  )}
                </label>
              </div>
              <div className='items-center flex flex-row rounded bg-[#ebebeb] my-2'>
                <input 
                  type='file' 
                  id='coverImage'
                  name='coverImage' 
                  onChange={handleCoverImage} 
                  accept='image/*'
                  className='hidden'
                  required 
                />
              </div>
            </div>

            <div className='p-2'>
              <label htmlFor='bookLabel' className='block text-[#1d1c1c]'>Book:</label>
              <label htmlFor='book' className='h-32 my-2 flex items-center justify-center bg-[#ebebeb] cursor-pointer rounded outline-none focus:ring-1 focus:ring-[#00668c] hover:ring-1'>
                {formData.book ? (
                  <span className='flex'>
                    <Image src="/book.png" width={20} height={20} />
                    {formData.book.name}
                  </span>
                ) : (
                  <Image src="/plus.png" width={20} height={20} />
                )}
              </label>
              <div className='items-center flex flex-row rounded bg-[#ebebeb] my-2'>
                <input 
                  type='file' 
                  id='book'
                  name='book' 
                  onChange={handleBook} 
                  accept='application/pdf'
                  className='hidden'
                  required 
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="mt-4 bg-[#fe7e01] text-[#ffffff] text-lg font-semibold py-2 px-4 rounded hover:bg-[#f19132] transition duration-300">Deploy Book</button>
          </div>
        </form>
     </div>
    </div>
      
  )
} 
