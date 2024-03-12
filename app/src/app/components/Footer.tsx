'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export default function Footer() {

  return (
    <footer className='bg-[#00668c] py-4 mt-auto rounded-t-[30px]'>
      <div className='container mx-auto text-center'>
        <p className='text-lg font-semibold text-[#fffefb] underline'>Swap $POX</p>
      </div>
      <div className='flex max-w-7xl mx-auto my-3'>
        <div className='flex'>
          <Image src="/fox.png" width={128} height={128} className='rounded-full'/>
          <h1 className='text-xl font-semibold text-[#fe7e01] my-auto mx-2'>Astro_3261</h1>    
        </div>
        <div className='flex my-auto ml-auto'>
          <div style={{ width: '30px', height: '30px', margin: 'auto 10px' }}>
            <Image src='/x.svg' width={30} height={30} />
          </div>
           <div style={{ width: '40px', height: '40px' }}>
            <Image src='/github.svg' width={40} height={40} />
          </div>
        </div>
     </div>
    </footer> 
  )
}
