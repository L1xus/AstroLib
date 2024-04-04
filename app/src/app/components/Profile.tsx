'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Profile() {
  return (
    <div className='max-w-7xl mx-auto my-3 p-6 bg-[#f5f4f1] rounded-lg'>
      <div className='flex'>
        <div className='flex flex-col items-center justify-center shadow-xl rounded p-3 m-3 bg-[#b6ccd8]'>
          <div className='flex items-center'>
            <div style={{ width: '16px', height: '16px' }}>
              <Image src='/book.png' width={16} height={16} />
            </div>
            <h1 className='text-lg font-semibold text-[#00668c] pl-1 uppercase'>Book Name</h1>
          </div>
          <div className='w-auto h-72'>
            <img src="/test.jpg" alt="" className="h-full object-cover rounded" loading="lazy" />
          </div>
          <button className='m-1 p-2 w-full text-md font-semibold text-[#f5f4f1] bg-[#fe7e01] rounded hover:bg-[#f19132]'>
              Read Book
          </button>
        </div>
      </div>
    </div>
  )
}
