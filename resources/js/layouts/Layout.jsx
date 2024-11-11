import { Link, usePage } from "@inertiajs/react";
import { route } from 'ziggy-js';
import { SwitchTheme } from "../theme";
import { useState } from "react";


export default function Layout({children}) {
  const {auth} = usePage().props;
  const [showmodel,setshowmodel] = useState(false);
  const togglemodel = ()=>{
    setshowmodel(!showmodel);
  }
  return (
    <div className="max-w-screen">
      <header className=" bg-slate-800 px-4 py-5">
        <nav className="flex justify-between items-center gap-4 text-slate-200 font-semibold">
          <h1 className="text-3xl font-semibold">Inertia Blog</h1>
          
            {auth.user ? (
              <div className="space-x-4 pr-5 flex items-center">
                <button onClick={SwitchTheme}>
                  <img  src="/night-mode.png" width={24} alt="" />
                </button>
              <Link href={route('home')}>Home</Link>
              {auth.user.role === 'admin' && 
                <Link href={route('admin.page')}>Admin</Link>
                }
              <div className="relative flex items-center">
                <button onClick={togglemodel}>{auth.user.name}</button>
                <button>
                  <img src="/chevron.png" alt="" />
                </button>
                {showmodel && 
                <div onClick={togglemodel} className="absolute z-50 top-16 right-0 border dark:border-slate-200 bg-slate-800 text-white rounded-lg overflow-hidden w-40">
                  <Link href={route('posts.create')} className="block w-full px-6 py-3 hover:bg-slate-700 text-left">Create Post</Link>
                  <Link href={route('dashboard')} className="block w-full px-6 py-3 hover:bg-slate-700 text-left">Dashboard</Link>
                  <Link href={route('edit.profile')} className="block w-full px-6 py-3 hover:bg-slate-700 text-left">Edit Profile</Link>
                  <Link href={route('logout')} method="post" as="button" type="submit" className="block w-full px-6 py-3 hover:bg-slate-700 text-left">Logout</Link>
               </div>
               }
              </div>
            
            
            </div>
            ) :(
              <>
              <div className="flex gap-3">
              <button onClick={SwitchTheme}>
                  <img  src="/night-mode.png" width={24} alt="" />
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
