import Header from '../components/Header.tsx'
import SwapApp from '../components/SwapApp.tsx'
import Footer from '../components/Footer.tsx'

export default function Swap() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header/>
      <SwapApp/>
      <Footer/>
    </main>
  );
}
