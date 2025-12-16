import { toast, ToastContainer } from 'react-toastify';
import Navbar from '@/Components/Navbar/Navbar';
import Footer from '@/Components/Footer/Footer';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';


export default function Layout({children}) {
  const {flash} = usePage().props;

   useEffect(()=>{
  if (flash?.demo) toast.info(flash.demo);
  },[flash])

  return (
  <div className="container flex flex-col lg:max-w-screen w-full lg:w-[80%] lg:mx-auto mx-0">
    <Navbar/>
    <main className="pt-24 px-8 lg:px-0">
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
    </main>
    <Footer/>
  </div>
  )
}