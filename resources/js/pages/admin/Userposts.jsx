import { Link, useForm } from '@inertiajs/react';
import React from 'react'
import { route } from 'ziggy-js';

export default function Userposts({user,posts}) {
  const{put}=useForm();
  const handleclick=(postid)=>{
    put(route('approve.update',postid));
  }
  return (
    <>
    <div className='bg-white flex items-center justify-center mx-auto p-8 rounded-lg shadow-lg dark:bg-slate-800 mb-4'>
    <p className='text-3xl text-black dark:text-slate-200 capitalize'>{user.name} posts</p>
    </div>
      <div className='bg-white flex items-center justify-between mx-auto p-8 rounded-lg shadow-lg dark:bg-slate-800 mb-4'>
      <table className='w-full mx-auto table-fixed border-collapse overflow-hidden rounded-md text-sm ring-1 ring-slate-300 dark:ring-slate-600 bg-white shadow-lg'>
       <thead className='bg-slate-600 text-slate-300 uppercase text-xs text-left'>
       <tr className="bg-slate-600 text-slate-300 uppercase text-xs text-left">
               <th className="w-3/6 p-3">Tilte</th>
               <th className="w-2/6 p-3">Approved</th>
               <th className="w-1/6 p-3 text-right">view</th>
           </tr>
           </thead>
           <tbody>
            {posts.data && posts.data.map((post)=>(
  <tr key={post.id} className='border-b border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-600 dark:border-slate-600'>
<td className='w-3/6 py-5 px-3'>
  {post.title}
</td>
<td className='w-2/6 py-5 px-3'>
<button onClick={()=>handleclick(post.id)}>
{post.approved ? (
  <img src="/approve.png" alt="" />
):(
  <img src="/clock.png" alt="" />
)}
</button>

</td>
<td className='w-2/6 py-5 px-3 text-right'>
  <Link href={route('posts.show',post.id)}>view</Link>
</td>
  </tr>
            ))}
          
           </tbody>
           </table>
           </div>
           </>
  )
}
