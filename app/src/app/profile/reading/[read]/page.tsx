'use client'

import Header from '../../../components/Header.tsx'
import PdfViewer from '../../../components/PdfViewer.tsx'
import Footer from '../../../components/Footer.tsx'

export default function Read({ params }: { params: { read: string } }) {
  const url = decodeURIComponent(params.read)
  console.log('URL:', url)
  return (
    <main className="min-h-screen">
      <Header/>
      <PdfViewer url={url}/>
      <Footer/>
    </main>
  )
}
