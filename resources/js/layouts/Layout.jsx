import { Link, usePage } from "@inertiajs/react";
import { route } from 'ziggy-js';


export default function Layout({children}) {
  const {auth} = usePage().props;
  return (
    <div className="max-w-screen">
      <header className=" bg-slate-800 px-4 py-5">
        <nav className="flex justify-between items-center gap-4 text-slate-200 font-semibold">
          <h1 className="text-3xl font-semibold">Inertia Blog</h1>
          <div className="space-x-4">
            {auth.user ? (
              <>
              <Link href={route('home')}>Home</Link>
              <Link href={route('about')}>About</Link>
              <Link href={route('posts.create')}>Create</Link>
              <Link href={route('logout')} method="post" as="button" type="submit">Logout</Link>
              </>

            ) :(
              <>
              <Link href={route('register')}>Register</Link>
              <Link href={route('login')}>Login</Link>
              </>
            )}

          </div>
        </nav>
      </header>
      <main className="p-4">
        {children}
      </main>
    </div>
  )
}
