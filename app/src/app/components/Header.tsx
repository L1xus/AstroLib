'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [input, setInput] = useState('')

  const getInput = (event) => {
    setInput(event.target.value)
  }

  return (
    <div className='max-w-full bg-[#00668c]'>
    <div className='flex justify-between max-w-7xl mx-auto p-2'>
      <Link href="/">
        <h1 className='text-2xl font-bold text-[#fffefb]'>AstroLib</h1>
      </Link>
      <div className='w-1/3 h-9 pr-3 items-center flex flex-row rounded outline-none bg-[#ebebeb]'>
        <input 
          type='text'
          name='input'
          placeholder='Search by Title / Author / Keywords '
          value={input} 
          onChange={getInput}
          className='w-full px-5 bg-inherit outline-none'
        />
        <button>
          <Image src="/search.svg" width={24} height={24} />
        </button>
      </div>
      <w3m-button />
    </div>
    </div>
  )
}
