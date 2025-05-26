import { Link, router, usePage } from "@inertiajs/react";
import { route } from 'ziggy-js';
import { useState,useEffect } from "react";


export default function Layout({children}) {
  const {auth} = usePage().props;
  const [showmodel,setshowmodel] = useState(false);
   const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );
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
  const togglemodel = ()=> setshowmodel(!showmodel);  
  const switchTheme = () => setDarkMode(prev => !prev);
  
  return (
    <div className="max-w-screen">
      <header className=" bg-slate-600 dark:bg-gray-800 px-4 py-5">
        <nav className="flex justify-between items-center gap-4 text-slate-200 font-semibold">
          <h1 className="text-3xl font-semibold">Inertia Blog</h1>
          
            {auth.user ? (
              <div className="space-x-4 pr-5 flex items-center">
                <button onClick={switchTheme}>
                  {darkMode ? (
                    <i className="fa-solid fa-sun text-yellow-300"></i>
                  ) : (
                    <i className="fa-solid fa-moon text-white"></i>
                  )}
                
                </button>
              <Link href={route('home')}>Home</Link>
              {auth.user.role === 'admin' && 
                <Link href={route('admin.page')}>Dashboard</Link>
                }
              <div className="relative flex items-center">
                <button onClick={togglemodel} className="mr-1">{auth.user.name}</button>
                <button>
                  <i className="fa-solid fa-caret-down"></i>
                </button>
                {showmodel && 
                <div onClick={togglemodel} className="absolute z-50 top-16 right-0 border dark:border-slate-200 bg-slate-600 dark:bg-slate-800 text-white rounded-lg overflow-hidden w-40">
                  <Link href={route('posts.create')} className="block w-full px-6 py-3 hover:bg-slate-700 text-left">Create Post</Link>
                  <Link href={route('dashboard')} className="block w-full px-6 py-3 hover:bg-slate-700 text-left">Dashboard</Link>
                  <Link href={route('edit.profile')} className="block w-full px-6 py-3 hover:bg-slate-700 text-left">Edit Profile</Link>
                  <button  onClick={handleLogout}  className="block w-full px-6 py-3 hover:bg-slate-700 text-left">Logout</button>
               </div>
               }
              </div>
            
            
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
      <main className="p-4">
        {children}
      </main>
    </div>
  )
}
