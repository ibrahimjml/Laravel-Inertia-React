import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { route } from "ziggy-js";

export default function Navbar({ user }) {
  const [showmodel, setshowmodel] = useState(false);
  const togglemodel = () => setshowmodel(!showmodel);

  return (
    <div className="bg-white flex items-center justify-between mx-auto p-8 rounded-lg shadow-lg dark:bg-slate-800 mb-4">
      
      {/* Title */}
      {route().current('comments.reports') ? (
        <p className="text-3xl text-black dark:text-slate-200 capitalize">comments reports</p>
      ) : route().current('posts.reports') ? (
        <p className="text-3xl text-black dark:text-slate-200 capitalize">posts reports</p>
      ) : route().current('tags.page') ? (
        <p className="text-3xl text-black dark:text-slate-200 capitalize">tags dashboard</p>
      ) : route().current('show.posts') && user ? (
        <p className="text-3xl text-black dark:text-slate-200 capitalize">{user.name.slice(0,10)}'s Posts</p>
      ) : (
        <p className="text-3xl text-black dark:text-slate-200 capitalize">admin dashboard</p>
      )}

      {/* Icon + dropdown wrapper */}
      <div className="relative">
        <div onClick={togglemodel} className="flex gap-1 items-center cursor-pointer">
          <FontAwesomeIcon
            icon="bars"
            className="block text-2xl mr-2 text-gray-800/80 dark:text-white"
          />
        </div>

        {showmodel && (
          <div className="absolute z-50 top-full right-0 mt-2 border dark:border-slate-200 bg-white dark:bg-slate-800 dark:text-white rounded-lg overflow-hidden w-40">
              <div className={`flex justify-between px-3 items-center ${route().current('admin.page')
                    ? 'bg-slate-600 font-bold text-white'
                    : 'hover:bg-slate-700 hover:text-white'
                 }`}>
                <FontAwesomeIcon icon="gauge" className="block text-md mr-2 text-gray-800/80 dark:text-white"/>
                <Link href={route('admin.page')} className={`block  py-3 rounded-lg tracking-[1px]  capitalize`}>
                   Panel
                </Link>
              </div>
              <div className={`flex justify-between px-3 items-center ${route().current('users.page')
                    ? 'bg-slate-600 font-bold text-white'
                    : 'hover:bg-slate-700 hover:text-white'
                 }`}>
                <FontAwesomeIcon icon="user" className="block text-md mr-2 text-gray-800/80 dark:text-white"/>
                <Link href={route('users.page')} className={`block  py-3 rounded-lg tracking-[1px]  capitalize`}>
                   Users
                </Link>
              </div>
              <div className={`flex justify-between px-3 items-center ${route().current('posts.reports')
                    ? 'bg-slate-600 font-bold text-white'
                    : 'hover:bg-slate-700 hover:text-white'
                 }`}>
                <FontAwesomeIcon icon="file" className="block text-md mr-2 text-gray-800/80 dark:text-white"/>
                <Link href={route('posts.reports')} className={`block  py-3 rounded-lg tracking-[1px]  capitalize`}>
                   p.reports
                </Link>
              </div>
              <div className={`flex justify-between px-3 items-center ${route().current('comments.reports')
                    ? 'bg-slate-600 font-bold text-white'
                    : 'hover:bg-slate-700 hover:text-white'
                 }`}>
                <FontAwesomeIcon icon="file" className="block text-md mr-2 text-gray-800/80 dark:text-white"/>
                <Link href={route('comments.reports')} className={`block  py-3 rounded-lg tracking-[1px]  capitalize`}>
                   c.reports
                </Link>
              </div>
              <div className={`flex justify-between px-3 items-center ${route().current('tags.page')
                    ? 'bg-slate-600 font-bold text-white'
                    : 'hover:bg-slate-700 hover:text-white'
                 }`}>
                <FontAwesomeIcon icon="tag" className="block text-md mr-2 text-gray-800/80 dark:text-white"/>
                <Link href={route('tags.page')} className={`block  py-3 rounded-lg tracking-[1px]  capitalize`}>
                     Tags
                </Link>
              </div>
          </div>
        )}
      </div>
    </div>
  );
}
