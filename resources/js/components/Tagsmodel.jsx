import { Link } from '@inertiajs/react'
import React from 'react'
import { route } from 'ziggy-js'

export default function Tagsmodel({closemodel,tag}) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-20 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[40%] max-h-[80vh]  overflow-y-auto relative">
        <button
          onClick={closemodel}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          <i className="fa-solid fa-close text-black dark:text-white"></i>
        </button>
        <h3 className="text-lg font-bold mb-4 text-center">Related Posts to #{tag.name}</h3>
       <ul className="space-y-4">
          {tag.posts && tag.posts.map(post => (
            <li key={post.id} className="flex items-center gap-3">
              <img
                src={post.image}
                alt={post.title}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div className="flex-1 flex items-center justify-between">
                <span className="font-medium text-gray-800 dark:text-white">{post.title}</span>
                <Link
                  href={route('posts.show',post.id)}
                  className="text-sm  justify-end text-blue-500 hover:underline">
                  View
                </Link>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}
