'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export default function SwapApp() {
  const [input, setInput] = useState('')

  const getInput = (event) => {
    setInput(event.target.value)
  }

  return (
    <div className='max-w-7xl mx-auto my-3 p-6 bg-[#f5f4f1] rounded-lg	'>
      <div className='relative grid grid-rows-2 m-auto max-w-lg bg-[#00668c] rounded-lg'>
        <div className='mb-1 m-2 p-3.5 bg-[#71c4ef] h-32 rounded-lg'>
          <p className='text-[#313d44]'>You Pay</p>
          <div className='flex'>
            <input 
              type='number'
              name='input'
              placeholder='0'
              value={input} 
              onChange={getInput}
              className='text-[36px] text-[#f5f4f1] font-semibold w-5/6 bg-inherit outline-none'
            />
            <div className='flex bg-[#00668c] m-auto py-0.5 px-3 rounded-full'>
              <div style={{ width: '24px', height: '24px', margin: 'auto' }}>
                <Image src='/eth.png' width={24} height={24} className='rounded-full'/>
              </div>
              <p className='text-[20px] text-[#f5f4f1] pl-1.5 font-semibold'>ETH</p>
            </div>
          </div>
        </div>
        
        <div className='absolute inset-0 flex justify-center items-center'>
          <div className='bg-[#71c4ef] border-4 border-[#00668c] rounded-lg hover:border-[#fe7e01]'>
            <button className='flex justify-center items-center p-1.5'>
              <Image src='/up-down.png' width={24} height={24} className='rounded-full'/>
            </button>
          </div>
        </div>

        <div className='mt-0 m-2 p-3.5 bg-[#71c4ef] h-32 rounded-lg'>
          <p className='text-[#313d44]'>You Receive</p>
          <div className='flex'>
            <input 
              type='number'
              name='input'
              placeholder='0'
              value={input} 
              onChange={getInput}
              className='text-[36px] text-[#f5f4f1] font-semibold w-5/6 bg-inherit outline-none'
            />
            <div className='flex bg-[#00668c] m-auto py-0.5 px-3 rounded-full'>
              <div style={{ width: '24px', height: '24px', margin: 'auto' }}>
                <Image src='/pox.png' width={24} height={24} className='rounded-full'/>
              </div>
              <p className='text-[20px] text-[#f5f4f1] pl-1.5 font-semibold'>POX</p>
            </div>
          </div>
        </div>
      </div>
    </div>
 )
}
