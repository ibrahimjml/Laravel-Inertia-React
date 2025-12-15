import { ToastContainer } from 'react-toastify';
import Navbar from '@/Components/Navbar/Navbar';
import Footer from '@/Components/Footer/Footer';


export default function Layout({children}) {
  
  return (
  <div className="container flex flex-col lg:max-w-screen w-[80%] mx-auto">
    <Navbar/>
    <main className="pt-24">
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
    </main>
    <Footer/>
  </div>
  )
}