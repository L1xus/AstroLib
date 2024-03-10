import Image from "next/image";
import Header from "./components/Header.tsx"
import Library from "./components/Library.tsx"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header/>
      <Library/>
    </main>
  );
}
