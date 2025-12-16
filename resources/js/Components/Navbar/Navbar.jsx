import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, router, usePage } from "@inertiajs/react";
import { route } from 'ziggy-js';
import { useEffect, useState } from "react";


export default function Navbar() {
   const {auth} = usePage().props;
   const [showmodel,setshowmodel] = useState(false);
   const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
   const [showHeader, setShowHeader] = useState(true);
   const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  
 const handleLogout = () => {
  router.post(route('logout'));
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
    <>
    <header className={`container mx-auto lg:w-[80%] rounded-lg
    bg-white dark:bg-gray-800/80 
    backdrop-blur-md backdrop-saturate-150
    border border-white/20 dark:border-white/10
    px-4 py-5
    transition-transform duration-300
    z-50  fixed top-0
    ${showHeader ? "translate-y-0" : "-translate-y-full"}
  `}
>
      <nav className="flex justify-between items-center gap-4 text-slate-200 font-semibold">
          <h1 className="text-3xl font-semibold text-gray-800/80 dark:text-white">Inertia</h1>
          
            {auth.user ? (
              <div className="space-x-4 pr-5 flex items-center text-black/40 dark:text-white">
                <button onClick={switchTheme}>
                  {darkMode ? (
                    <i className="fa-solid fa-sun text-yellow-300"></i>
                  ) : (
                    <i className="fa-solid fa-moon text-black/40 dark:text-white"></i>
                  )}
                
                </button>
              <Link href={route('home')} className="hidden lg:block text-gray-800/80 dark:text-white">Home</Link>
              {auth?.user.can.access  && 
                <Link href={route('admin.page')} className="hidden lg:block text-gray-800/80 dark:text-white">Admin Panel</Link>
                }
              <div className="relative flex items-center">
                <div onClick={togglemodel} className="flex gap-1 items-center">
                  <FontAwesomeIcon icon="user" className="hidden lg:block text-sm mr-2 text-gray-800/80 dark:text-white"></FontAwesomeIcon>
                <button className="mr-1 hidden lg:block text-gray-800/80 dark:text-white">{auth.user.name}</button>
                <button className="hidden lg:block text-gray-800/80 dark:text-white">
                  <i className="fa-solid fa-caret-down"></i>
                </button>
                </div>
                {showmodel && 
                <div onClick={togglemodel} className="absolute z-50 top-16  -right-4 border dark:border-slate-200 bg-white dark:bg-slate-800 dark:text-white rounded-lg overflow-hidden w-40">
                  <Link href={route('posts.create')} className="block w-full px-6 py-3 dark:hover:bg-slate-700 hover:bg-gray-200/20 text-left text-gray-800/80 dark:text-white">Create Post</Link>
                  <Link href={route('dashboard')} className="block w-full px-6 py-3 dark:hover:bg-slate-700 hover:bg-gray-200/20 text-left text-gray-800/80 dark:text-white">Dashboard</Link>
                  <Link href={route('edit.profile')} className="block w-full px-6 py-3 dark:hover:bg-slate-700 hover:bg-gray-200/20 text-left text-gray-800/80 dark:text-white">Edit Profile</Link>
                  <Link href={route('home')} className="lg:hidden block w-full px-6 py-3 dark:hover:bg-slate-700 hover:bg-gray-200/20 text-left text-gray-800/80 dark:text-white">Home</Link>
                   {auth.user.role === 'admin' && 
                  <Link href={route('admin.page')} className="lg:hidden block w-full px-6 py-3 dark:hover:bg-slate-700 hover:bg-gray-200/20 text-left text-gray-800/80 dark:text-white">Admin Panel</Link>
                   }
                  <button  onClick={handleLogout}  className="block w-full px-6 py-3 dark:hover:bg-slate-700 hover:bg-gray-200/20 text-left text-gray-800/80 dark:text-white">Logout</button>
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
        </>
  )
}
