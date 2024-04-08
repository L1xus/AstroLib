import Header from '../components/Header'
import Profile from '../components/Profile'
import Footer from '../components/Footer'

export default function ProfilePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header/>
      <Profile/>
      <Footer/>
    </main>
  )
}
