'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export default function Library() {
  return (
    <div className='max-w-7xl mx-auto my-3 p-6 bg-[#f5f4f1] rounded-lg	'>
      <div className='flex'>
        <Image src="/library.png" width={28} height={28} />
        <h1 className='text-xl font-semibold ps-1 uppercase text-[#3b3c3d]'>Library</h1>
      </div>
      <div className='mt-3'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>

          <div className='flex bg-red-600 h-48 p-3'>
            <div className='w-1/2 h-full mr-3'>
              <img src="/test.jpg" alt="" className="h-full object-cover" loading="lazy" />
            </div>
            <div className='w-1/2'>
              <h1>Book Title N1</h1>
            </div>
          </div>

          <div className='bg-red-600 h-48'>
            <div className='w-full h-full'>
              <img src="/test.jpg" alt="" className="h-full object-cover" loading="lazy" />
            </div>
          </div>

           <div className='bg-red-600 h-48'>
            <div className='w-full h-full'>
              <img src="/test.jpg" alt="" className="h-full object-cover" loading="lazy" />
            </div>
          </div>

           <div className='bg-red-600 h-48'>
            <div className='w-full h-full'>
              <img src="/test.jpg" alt="" className="h-full object-cover" loading="lazy" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
