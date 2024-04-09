'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {

  return (
    <footer className='bg-[#00668c] py-4 mt-auto rounded-t-[30px]'>
      <div className='container mx-auto text-center'>
        <p className='text-lg font-semibold text-[#fffefb] underline'>
          <Link href='/swap'>Swap $POX</Link>
        </p>
      </div>
      <div className='flex max-w-7xl mx-auto my-3'>
        <div className='flex'>
          <Image src="/fox.png" width={128} height={128} className='rounded-full' alt="fox"/>
          <h1 className='text-xl font-semibold text-[#fe7e01] my-auto mx-2'>Astro_3261</h1>    
        </div>
        <div className='flex my-auto ml-auto'>
          <div style={{ width: '30px', height: '30px', margin: 'auto 10px' }}>
            <Link href='https://twitter.com/Astro_3261' legacyBehavior>
              <a target="_blank" rel="noopener noreferrer">
                <Image src='/x.svg' width={30} height={30} alt="x" />
              </a>
            </Link>
          </div>
          <div style={{ width: '40px', height: '40px' }}>
            <Link href='https://github.com/L1xus' legacyBehavior>
              <a target="_blank" rel="noopener noreferrer">
                <Image src='/github.svg' width={40} height={40} alt="github"/>
              </a>
            </Link>
          </div>
        </div>
     </div>
    </footer> 
  )
}
