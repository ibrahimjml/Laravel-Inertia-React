import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'
import { route } from 'ziggy-js'


export default function Show({ posts,canmodify,tags}) {
  const { delete: destroy } = useForm();

  const handleDelete = (postId) => {
    if (confirm('Are you sure you want to delete this post?')) {
      destroy(route('posts.destroy', postId), {
        preserveScroll: true,
      });
    }
  }
  return (
    <>
    <Head title={posts.title.slice(0,5)}/>
      <div className=' flex justify-center'>

        <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-[50%] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img className="p-5 roubded-lg object-cover w-full rounded-t-lg h-96 md:h-auto md:w-[40%] md:rounded-none md:rounded-s-lg"
            src={posts.image
              ? `/images/${posts.image}`
              : "/storage/images/default.jpg"
            } alt={posts.title}
          />
          <div className="flex flex-col w-full">
            {/* post detail  */}
            <div className='flex justify-between items-center'>
            <p className='text-slate-400 border-b border-b-slate-400 px-4  w-full py-4'>Post Details</p>
              {canmodify &&
              <div className='flex gap-3 text-slate-400 px-5'>
              <Link href={route('posts.edit',posts.id)}>Edit</Link>
              <button onClick={() => handleDelete(posts.id)}>Delete</button>
            </div>
              }
              
            </div>
            <div className='py-10 px-4 leading-normal'>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{posts.title}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{posts.description}</p>
            </div>
            <div className='flex items-center justify-start gap-3 px-4 pb-3 mt-2'>
              {tags && tags.split(",").map((tag, index) => (
                <button
                  key={index}
                  className="bg-slate-600 px-2 py-px text-white text-sm rounded-full"
                >
                  {tag.trim()}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
