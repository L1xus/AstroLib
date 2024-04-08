import Header from "./components/Header"
import Library from "./components/Library"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header/>
      <Library/>
      <Footer/>
    </main>
  );
}
