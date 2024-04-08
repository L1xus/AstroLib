import Header from '../components/Header'
import SwapApp from '../components/SwapApp'
import Footer from '../components/Footer'

export default function Swap() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header/>
      <SwapApp/>
      <Footer/>
    </main>
  )
}
