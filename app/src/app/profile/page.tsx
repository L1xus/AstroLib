import Header from '../components/Header.tsx'
import Profile from '../components/Profile.tsx'
import Footer from '../components/Footer.tsx'

export default function ProfilePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header/>
      <Profile/>
      <Footer/>
    </main>
  )
}
