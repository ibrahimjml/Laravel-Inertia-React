import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, router, usePage } from "@inertiajs/react";
import { route } from '@/ziggylocale';
import { useEffect, useState } from "react";
import LanguageSwitcher from "../LanguageSwitcher";
import { useMessagesT } from "@/i18n/helpers/useMessagesT";
import { useAuthT } from "@/i18n/helpers/useAuthT";

export default function Navbar() {
   const {auth} = usePage().props;
   const m = useMessagesT();
   const a = useAuthT();
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
    <header className={`container mx-auto w-[80%] rounded-lg
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
          <img src={'/ibrahim.jpg'} alt="Logo" className="h-12 w-12 rounded-full border-4 dark:border-blue-600/60 border-black/70"/>
            {auth.user ? (
              <div className="gap-3 flex items-center text-black/40 dark:text-white">
                <button onClick={switchTheme}>
                  {darkMode ? (
                    <i className="fa-solid fa-sun text-yellow-300"></i>
                  ) : (
                    <i className="fa-solid fa-moon text-black/40 dark:text-white"></i>
                  )}
                
                </button>
                <LanguageSwitcher/>
              <Link href={route('home')} className="hidden lg:block text-gray-800/80 dark:text-white">{m('home')}</Link>
              {auth?.user.can.access  && 
                <Link href={route('admin.page')} className="hidden lg:block text-gray-800/80 dark:text-white">{m('admin_panel')}</Link>
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
                <div onClick={togglemodel} className="absolute z-50 top-16  lg:-right-4 -right-10 border dark:border-slate-200 bg-white dark:bg-slate-800 dark:text-white rounded-lg overflow-hidden w-40">
                  <Link href={route('posts.create')} className="block w-full px-6 py-3 dark:hover:bg-slate-700 hover:bg-gray-200/20 text-left text-gray-800/80 dark:text-white">{m('create_post')}</Link>
                  <Link href={route('dashboard')} className="block w-full px-6 py-3 dark:hover:bg-slate-700 hover:bg-gray-200/20 text-left text-gray-800/80 dark:text-white">{m('dashboard')}</Link>
                  <Link href={route('edit.profile')} className="block w-full px-6 py-3 dark:hover:bg-slate-700 hover:bg-gray-200/20 text-left text-gray-800/80 dark:text-white">{m('edit_profile')}</Link>
                  <Link href={route('home')} className="lg:hidden block w-full px-6 py-3 dark:hover:bg-slate-700 hover:bg-gray-200/20 text-left text-gray-800/80 dark:text-white">{m('home')}</Link>
                   {auth.user.role === 'admin' && 
                  <Link href={route('admin.page')} className="lg:hidden block w-full px-6 py-3 dark:hover:bg-slate-700 hover:bg-gray-200/20 text-left text-gray-800/80 dark:text-white">{m('admin_panel')}</Link>
                   }
                  <button  onClick={handleLogout}  className="block w-full px-6 py-3 dark:hover:bg-slate-700 hover:bg-gray-200/20 text-left text-gray-800/80 dark:text-white">{m('logout')}</button>
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
                <i className="fa-solid fa-moon text-black/40 dark:text-white"></i>
              )}
                </button>
                <Link href={route('register')} className="text-gray-800/80 dark:text-white">{}{a('register')}</Link>
                <Link href={route('login')} className="text-gray-800/80 dark:text-white">{a('login')}</Link>
              </div>
              </>
            )}

        
        </nav>
        </header>
        </>
  )
}
