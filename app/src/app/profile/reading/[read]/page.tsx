'use client'

import Header from '../../../components/Header'
import PdfViewer from '../../../components/PdfViewer'
import Footer from '../../../components/Footer'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getAccount } from '../../../utils/config'
import { verifyMessage } from 'viem'

export default function Read({ params }: { params: { read: string } }) {
  const url = decodeURIComponent(params.read)
  const [isSignatureValid, setIsSignatureValid] = useState(false)

  const urlParams = useSearchParams()
  const signature = urlParams.get('signature')
  
  useEffect(() => {
    window.history.pushState({}, '', '/read')

    if (signature) {
      verifySignature()
    }
  }, [])

  const verifySignature = async () => {
    try {
      const account = await getAccount()
      const message = 'I agree to read this book!'

      if (signature && signature.startsWith('0x')) {
        const valid = await verifyMessage({
          address: account,
          message,
          signature: signature as `0x${string}` | Uint8Array
        })

        setIsSignatureValid(valid)
      } else {
        console.error('Invalid or missing signature')
        setIsSignatureValid(false)
      }

    } catch (error) {
      console.error('Error Verifting Signature!')
      setIsSignatureValid(false)
    }
  }

  if (!isSignatureValid) {
    return (
      <main className="min-h-screen">
        <Header/>
        <div>Access denied. Please sign the message to read the book!</div>
        <Footer/>
      </main>
    )

  }

  return (
    <main className="min-h-screen">
      <Header/>
      <PdfViewer url={url}/>
      <Footer/>
    </main>
  )
}
