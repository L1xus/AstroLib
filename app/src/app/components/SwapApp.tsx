'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { getAccount, publicClient, walletClient } from '../utils/config'
import PFSwap from '../artifacts/contracts/PFSwap.sol/PFSwap'
import PFToken from '../artifacts/contracts/PFToken.sol/PFToken'
import { parseEther, parseUnits } from 'viem'

export default function SwapApp() {
  const [showETH, setShowETH] = useState(true)
  const [payInput, setPayInput] = useState('')
  const [receiveInput, setReceiveInput] = useState('')
  const [swapProgress, setSwapProgress] = useState('')

  const getPayInput = (event) => {
    setPayInput(event.target.value)
  }

  const getReceiveInput = (event) => {
    setReceiveInput(event.target.value)
  }

  const toggleSwap = () => {
    setShowETH(!showETH)
  }

  const submitSwap = async () => {
    setSwapProgress('Approving')
    
    const account = await getAccount()

    if(!showETH) {
      const approvalAmount = parseUnits(payInput, 18)
      const approvalRequest = await publicClient.simulateContract({
        account,
        address: '0x7bEea9EAb0610008605ce9ad3C10BD2608646AB8',
        abi: PFToken.abi,
        functionName: 'approve',
        args: ['0xf8E6AEE797Cc258affCC06852088CA4898E2E566', approvalAmount]
      })
      const approvalHash = await walletClient.writeContract(approvalRequest.request)
      await publicClient.waitForTransactionReceipt({hash: approvalHash}) 
    }

    setSwapProgress('Swapping')

    const functionName = showETH ? 'swapETHtoPOX' : 'swapPOXtoETH'
    const valueOrArgs = showETH ? { value: parseEther(payInput) } : { args: [parseUnits(payInput, 18)] }

    const { request } = await publicClient.simulateContract({
      account,
      address: '0xf8E6AEE797Cc258affCC06852088CA4898E2E566',
      abi: PFSwap.abi,
      functionName: functionName,
      ...valueOrArgs
    })

    const swapHash = await walletClient.writeContract(request)
    await publicClient.waitForTransactionReceipt({hash: swapHash})

    setSwapProgress('')
  }

  return (
    <div className='max-w-7xl mx-auto my-3 p-6 bg-[#f5f4f1] rounded-lg	'>
      <div className='m-auto max-w-lg pb-2 bg-[#00668c] rounded-lg'>
        <div className='relative grid grid-rows-2'>
        <div className='mb-1 m-2 p-3.5 bg-[#71c4ef] h-32 rounded-lg'>
          <p className='text-[#313d44]'>You Pay</p>
          <div className='flex'>
            <input 
              type='number'
              name='payInput'
              placeholder='0'
              value={payInput} 
              onChange={getPayInput}
              className='text-[36px] text-[#f5f4f1] font-semibold w-5/6 bg-inherit outline-none'
            />
            <div className='flex bg-[#00668c] m-auto py-0.5 px-3 rounded-full'>
              <div style={{ width: '24px', height: '24px', margin: 'auto' }}>
                <Image src={showETH ? '/eth.png' : '/pox.png'} width={24} height={24} className='rounded-full'/>
              </div>
              <p className='text-[20px] text-[#f5f4f1] pl-1.5 font-semibold'>{showETH ? 'ETH' : 'POX'}</p>
            </div>
          </div>
        </div>
        
        <div className='absolute inset-1/3 flex justify-center items-center'>
          <div className='bg-[#71c4ef] border-4 border-[#00668c] rounded-lg hover:border-[#fe7e01]'>
            <button className='flex justify-center items-center p-1.5' onClick={toggleSwap}>
              <Image src='/up-down.png' width={24} height={24} className='rounded-full'/>
            </button>
          </div>
        </div>

        <div className='mx-2 p-3.5 bg-[#71c4ef] h-32 rounded-lg'>
          <p className='text-[#313d44]'>You Receive</p>
          <div className='flex'>
            <input 
              type='number'
              name='receiveInput'
              placeholder='0'
              value={receiveInput} 
              onChange={getReceiveInput}
              className='text-[36px] text-[#f5f4f1] font-semibold w-5/6 bg-inherit outline-none'
            />
            <div className='flex bg-[#00668c] m-auto py-0.5 px-3 rounded-full'>
              <div style={{ width: '24px', height: '24px', margin: 'auto' }}>
                <Image src={showETH ? '/pox.png' : '/eth.png'} width={24} height={24} className='rounded-full'/>
              </div>
              <p className='text-[20px] text-[#f5f4f1] pl-1.5 font-semibold'>{showETH ? 'POX' : 'ETH'}</p>
            </div>
          </div>
        </div>
        </div>
        <div className='mx-2 text-lg font-semibold text-[#f5f4f1] bg-[#fe7e01] rounded-lg hover:bg-[#f19132]'>
          <button type='button' className='p-2 w-full' onClick={submitSwap}>
            { swapProgress === 'Approving' ? 'Approving...' : swapProgress === 'Swapping' ? 'Swapping...' : 'Swap' }
          </button>
        </div>
      </div>
    </div>
 )
}
