'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export default function BookInfo() {
  return (
    <div className='max-w-7xl mx-auto my-3 p-6 bg-[#f5f4f1] rounded-lg	'>
      <div className='md:flex bg-[#b6ccd8] shadow-xl p-6 rounded'>
        <div className='w-auto h-full'>
          <img src="/test.jpg" alt="" className="h-full object-cover rounded" loading="lazy" />
        </div>
        <div className='flex-grow my-auto px-5'>
          <div className='flex items-center'>
            <div style={{ width: '16px', height: '16px' }}>
              <Image src='/book.png' width={16} height={16} />
            </div>
            <h1 className='text-2xl font-semibold text-[#00668c] pl-1 uppercase'>Book Title N1</h1>
          </div>
          <div className='flex my-3'>
            <p>
              "Lost Note" is a short story about fighting depression and anxiety and the creation of the poem "Lost".
              <br/>
              "Exquisite, truthful, brutal" literary artwork by xVALORIAN.
            </p>  
          </div>
          <table>
            <tbody>
              <tr>
                <td className="pr-12 py-2">Maximum Supply</td>
                <td className="pr-12 py-2">10,000</td>
              </tr>
              <tr>
                <td className="pr-12 py-2">Total Owners</td>
                <td className="pr-12 py-2">9,234</td>
              </tr>
              <tr>
                <td className="pr-12 py-2">Total Transactions</td>
                <td className="pr-12 py-2">5,371</td>
              </tr>
              <tr>
                <td className="pr-12 py-2">Listing</td>
                <td className="pr-12 py-2">234</td>
              </tr>
            </tbody>
          </table>
          <div className='my-3 mx-auto'>
            <button className='px-12 py-2 rounded text-[#00668c] font-semibold border-2 border-[#00668c]'>Buy Page</button>
          </div>
        </div>
      </div>
      <div className='py-6 px-[30%]'>
        <h1 className='text-xl font-bold text-[#00668c] pl-1 uppercase'>About Book</h1>
        <table className='w-full mt-3'>
          <tbody>
            <tr>
              <td className="pr-[30%] py-2">Book ID</td>
              <td className="py-2">490eb813-9...19a34f68f8</td>
            </tr>
            <tr>
              <td className="pr-12 py-2">Contract Address</td>
              <td className="py-2">0xeBd65E2c...1Dec9fa3D5</td>
            </tr>
            <tr>
              <td className="pr-12 py-2">Publication Date</td>
              <td className="py-2">5,371</td>
            </tr>
            <tr>
              <td className="pr-12 py-2">Listing</td>
              <td className="py-2">234</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='px-[30%]'>
        <h1 className='text-xl font-bold text-[#00668c] pl-1 uppercase'>Auhtor Information</h1>
        <table className='w-full mt-3'>
          <tbody>
            <tr>
              <td className="pr-[30%] py-2">Astro</td>
            </tr>
            <tr>
              <td className="pr-12 py-2">Wallet Address</td>
              <td className="py-2">0xeBd65E2c...1Dec9fa3D5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
      
  )
}
