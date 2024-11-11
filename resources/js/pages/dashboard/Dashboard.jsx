import { Link, useForm, usePage } from '@inertiajs/react';
import React from 'react'
import { route } from 'ziggy-js';
import Paginatelinks from '../../components/Paginatelinks';

export default function Dashboard({posts,suspended,success}) {
  const {auth} = usePage().props;
  const { delete: destroy } = useForm();

  const handledelete = (postId) => {
    if (confirm('Are you sure you want to delete this post?')) {
      destroy(route('posts.destroy', postId), {
        preserveScroll: true,
      });
    }
  }
  return (
    <>
    <div className='bg-white flex items-center justify-between mx-auto p-8 rounded-lg shadow-lg dark:bg-slate-800 mb-4'>
      <p className='text-3xl text-black dark:text-slate-200 capitalize'>{auth.user.name} dashboard</p>
      <div className='flex items-center gap-4'>
        <p>Approved</p>
        <img src="/approve.png" alt="" />
        <p>Pending</p>
        <img src="/clock.png" alt="" />
      </div>
    </div>
    {success && <p className='text-sm text-green-500 mb-3 font-semibold'>{success}</p>}
    {suspended ? (
        <p className='text-red-500 text-center my-6'>Your account is suspended. Please contact support for more information.</p>
      ) : (
          
        <div className='bg-white flex items-center justify-between mx-auto p-8 rounded-lg shadow-lg dark:bg-slate-800 mb-4'>
          <table className='w-full mx-auto table-fixed border-collapse overflow-hidden rounded-md text-sm ring-1 ring-slate-300 dark:ring-slate-600 bg-white shadow-lg'>
            <thead className='bg-slate-300 text-xs uppercase text-slate-600 dark:text-slate-400 dark:bg-slate-900'>
              <tr>
                <th className="w-3/4 p-3 text-left">Post Title</th>
                <th className="w-1/4 py-3 pr-3 text-right">View</th>
                <th className="w-1/5 py-3 pr-3 text-right">Edit</th>
                <th className="w-1/5 py-3 pr-3 text-right">Delete</th>
              </tr>
            </thead>
            <tbody>
              {posts?.data && posts.data.length > 0 ? (
                posts.data.map((post) => (
                  <tr key={post.id} className='border-b border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-600 dark:border-slate-600'>
                    <td className='w-3/4 p-3 text-left'>
                      <div className='flex items-center gap-3'>
                        <img   
                          className='h-10 w-10 rounded-full object-cover object-center'
                          src={post.image ? `/images/${post.image}` : "storage/images/default.jpg"}
                          alt=""
                        />
                        <h3>{post.title.slice(0,50)}</h3>
                        {post.approved ? (
                          <img src="/approve.png" alt="approved" />
                        ) : (
                          <img src="/clock.png" alt="pending" />
                        )}
                      </div>
                    </td>
                    <td className='w-1/4 py-3 pr-3 text-right text-indigo-500'>
                      <Link href={route('posts.show', post.id)}>View</Link>
                    </td>
                    <td className='w-1/4 py-3 pr-3 text-right text-indigo-500'>
                      <Link href={route('posts.edit', post.id)}>Edit</Link>
                    </td>
                    <td className='w-1/4 py-3 pr-3 text-right text-indigo-500'>
                      <button type='submit' onClick={() => { handledelete(post.id) }}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className='border-b border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-600 dark:border-slate-600'>
                  <td colSpan="4" className="text-center p-4">You have no posts yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!suspended && (
        <div className='flex justify-start mt-4'>
          <Paginatelinks posts={posts} />
        </div>
      )}
    </>
  )
}
