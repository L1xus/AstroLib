import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { cookieToInitialState } from 'wagmi'

import { config } from '@/config'
import { ContextProvider } from '@/context'

export const metadata: Metadata = {
  title: 'AstroLib',
  description: 'AstroLib a library of digital books on the Ethereum Blockchain.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body>
        <ContextProvider initialState={initialState}>{children}</ContextProvider>
      </body>
    </html>
  )
}
