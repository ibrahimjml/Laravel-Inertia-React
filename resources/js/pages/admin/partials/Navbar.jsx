import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";


export default function Navbar({user}) {
  return (
  <div className='bg-white flex items-center justify-between mx-auto p-8 rounded-lg shadow-lg dark:bg-slate-800 mb-4'>
    {route().current('tags.page') ? (
      <p className='text-3xl text-black dark:text-slate-200 capitalize'>tags dashboard</p>
    ) : route().current('show.posts') && user ? (
      <p className='text-3xl text-black dark:text-slate-200 capitalize'>{user.name}'s Posts</p>
    ) : (
      <p className='text-3xl text-black dark:text-slate-200 capitalize'>admin dashboard</p>
    )}
      
      <div className="flex gap-2">
        
        <Link href={route('admin.page')} className={`block w-full px-6 py-3  rounded-lg tracking-[1px] ${route().current('admin.page') ? 'bg-slate-600 font-bold text-white':'hover:bg-slate-700 hover:text-white'} capitalize`}>Panel</Link>
        <Link href={route('users.page')} className={`block w-full px-6 py-3  rounded-lg tracking-[1px] ${route().current('users.page') ? 'bg-slate-600 font-bold text-white':'hover:bg-slate-700 hover:text-white'} capitalize`}>users</Link>
        <Link href={route('tags.page')} className={`block w-full px-6 py-3  rounded-lg tracking-[1px] ${route().current('tags.page') ? 'bg-slate-600 font-bold text-white':'hover:bg-slate-700 hover:text-white'} capitalize`}>tags</Link>
      </div>
      </div>
  )
}
