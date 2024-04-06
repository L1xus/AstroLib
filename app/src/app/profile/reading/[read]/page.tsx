'use client'

import Header from '../../../components/Header.tsx'
import PdfViewer from '../../../components/PdfViewer.tsx'
import Footer from '../../../components/Footer.tsx'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getAccount } from '../../../utils/config.tsx'
import { verifyMessage } from 'viem'

export default function Read({ params }: { params: { read: string } }) {
  const url = decodeURIComponent(params.read)
  const [isSignatureValid, setIsSignatureValid] = useState(false)

  const urlParams = useSearchParams()
  const signature = urlParams.get('signature')
  
  useEffect(() => {
    window.history.pushState({}, null, '/read')

    if (signature) {
      verifySignature()
    }
  }, [])

  const verifySignature = async () => {
    try {
      const account = await getAccount()
      const message = 'I agree to read this book!'

      const valid = await verifyMessage({ 
        address: account, 
        message,
        signature,
      })

      setIsSignatureValid(valid)
    } catch (error) {
      console.error('Error Verifting Signature!')
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
