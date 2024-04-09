'use client'

import Header from '../../components/Header'
import BookInfo from '../../components/BookInfo' 
import Footer from '../../components/Footer'
import { useSearchParams } from 'next/navigation'

export default function Book() {
  const searchParams = useSearchParams()
  const idx = searchParams.get('idx')

  return (
    <main className="min-h-screen">
      <Header/>
      <BookInfo index={parseInt(idx ?? '0', 10)}/>
      <Footer/>
    </main>
  )
}
