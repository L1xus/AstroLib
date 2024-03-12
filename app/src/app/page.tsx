import Header from "./components/Header.tsx"
import Library from "./components/Library.tsx"
import Footer from "./components/Footer.tsx"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header/>
      <Library/>
      <Footer/>
    </main>
  );
}
