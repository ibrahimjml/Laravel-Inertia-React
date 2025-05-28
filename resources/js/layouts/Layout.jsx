import { Link, router, usePage } from "@inertiajs/react";
import { route } from 'ziggy-js';
import { useState,useEffect } from "react";
import Inputsearch from "../Components/Inputsearch"

export default function Layout({children}) {
  const {auth} = usePage().props;
  const [showmodel,setshowmodel] = useState(false);
   const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  
 const handleLogout = () => {
  router.post(route('logout'), {}, {
    onSuccess: () => {
      window.location.reload(); 
    },
  });
};
useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  const togglemodel = ()=> setshowmodel(!showmodel);  
  const switchTheme = () => setDarkMode(prev => !prev);
  
  return (
    <div className="max-w-screen">
    <header className={`bg-slate-600 dark:bg-gray-800 px-4 py-5 transition-transform duration-300 z-50 w-full fixed top-0 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
        <nav className="flex justify-between items-center gap-4 text-slate-200 font-semibold">
          <h1 className="text-3xl font-semibold">Inertia Blog</h1>
          
            {auth.user ? (
              <div className="space-x-4 pr-5 flex items-center ">
                <button onClick={switchTheme}>
                  {darkMode ? (
                    <i className="fa-solid fa-sun text-yellow-300"></i>
                  ) : (
                    <i className="fa-solid fa-moon text-white"></i>
                  )}
                
                </button>
              <Link href={route('home')} className="hidden lg:block">Home</Link>
              {auth.user.role === 'admin' && 
                <Link href={route('admin.page')} className="hidden lg:block">Dashboard</Link>
                }
              <div className="relative flex items-center">
                <div onClick={togglemodel} className="flex gap-1">
                <button className="mr-1 hidden lg:block">{auth.user.name}</button>
                <button className="hidden lg:block">
                  <i className="fa-solid fa-caret-down"></i>
                </button>
                </div>
                {showmodel && 
                <div onClick={togglemodel} className="absolute z-50 top-16  lg:right-0 -right-10 border dark:border-slate-200 bg-slate-600 dark:bg-slate-800 text-white rounded-lg overflow-hidden w-40">
                  <Link href={route('posts.create')} className="block w-full px-6 py-3 hover:bg-slate-700 text-left">Create Post</Link>
                  <Link href={route('dashboard')} className="block w-full px-6 py-3 hover:bg-slate-700 text-left">Dashboard</Link>
                  <Link href={route('edit.profile')} className="block w-full px-6 py-3 hover:bg-slate-700 text-left">Edit Profile</Link>
                  <Link href={route('home')} className="lg:hidden block w-full px-6 py-3 hover:bg-slate-700 text-left">Home</Link>
                   {auth.user.role === 'admin' && 
                  <Link href={route('admin.page')} className="lg:hidden block w-full px-6 py-3 hover:bg-slate-700 text-left">Dashboard</Link>
                   }
                  <button  onClick={handleLogout}  className="block w-full px-6 py-3 hover:bg-slate-700 text-left">Logout</button>
               </div>
               }
              </div>
            
            <button onClick={togglemodel} className="mr-1 lg:hidden"><i className="fa-solid fa-bars"></i></button>
            </div>
            ) :(
              <>
              <div className="flex gap-3">
            <button onClick={switchTheme}>
              {darkMode ? (
               <i className="fa-solid fa-sun text-yellow-300"></i>
              ) : (
                <i className="fa-solid fa-moon text-white"></i>
              )}
                </button>
                <Link href={route('register')}>Register</Link>
                <Link href={route('login')}>Login</Link>
              </div>
              </>
            )}

        
        </nav>
      </header>
      <main className="p-4 pt-24">
        {children}
      </main>
    </div>
  )
}
