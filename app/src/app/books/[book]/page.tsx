'use client'

import Header from '../../components/Header.tsx'
import BookInfo from '../../components/BookInfo.tsx' 
import Footer from '../../components/Footer.tsx'
import { useSearchParams } from 'next/navigation'

export default function Book() {
  const searchParams = useSearchParams()
  const idx = searchParams.get('idx')

  return (
    <main className="min-h-screen">
      <Header/>
      <BookInfo index={idx}/>
      <Footer/>
    </main>
  )
}
