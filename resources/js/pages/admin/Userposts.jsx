import { Link, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react'
import { route } from 'ziggy-js';
import Paginatelinks from '../../components/Paginatelinks';


export default function Userposts({user,posts,filters}) {
  const [isChecked, setIsChecked] = useState(filters.unapproved || false);
  const{data,setData,put}=useForm({
    search:filters.search || '',
    unapproved:filters.unapproved || false
  });
  const handleclick=(postid)=>{
    put(route('approve.update',postid));
  }

  const Search = (eo) => {
    eo.preventDefault();
    const params = {
      search: data.search,
      unapproved: isChecked ? true : null
    };
    router.get(route('show.posts', user.id),params,{
      preserveState: true,
      replace: true,
    });
  };
  const handleCheckboxChange = () => {
    const checkedState = !isChecked;
    setIsChecked(checkedState);

    const params = {
      search: data.search,
      unapproved: checkedState ? true : null
    };

    router.get(route('show.posts', user.id),params, {
  
      preserveState: true,
      replace: true,
    });
  };

  return (
    <>
    <div className='bg-white flex items-center justify-center mx-auto p-8 rounded-lg shadow-lg dark:bg-slate-800 mb-4'>
    <p className='text-3xl text-black dark:text-slate-200 capitalize'>{user.name} posts</p>
    </div>
    <div className='mb-3'>
  {/* search box */}
    <form className=' w-1/5 ' onSubmit={Search}>   
    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="search" value={data.search}   onChange={(eo) => setData('search', eo.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search " required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-slate-600 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  dark:focus:ring-blue-800">Search</button>
    </div>
</form>
</div>
      <div className='bg-white mx-auto p-8 flex flex-col items-end gap-2 rounded-lg shadow-lg dark:bg-slate-800 mb-4'>
  {/* checkbox */}
    <div className='flex gap-2 w-fit bg-slate-600 p-2 rounded-md mb-2'>
        <input id='unapproved' type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
          <label htmlFor="unapproved">Unapproved</label>
    </div>
      <table className='w-full mx-auto table-fixed border-collapse overflow-hidden rounded-md text-sm ring-1 ring-slate-300 dark:ring-slate-600 bg-white shadow-lg'>
       <thead className='bg-slate-600 text-slate-300 uppercase text-xs text-left'>
       <tr className="bg-slate-600 text-slate-300 uppercase text-xs text-left">
               <th className="w-3/6 p-3">Tilte</th>
               <th className="w-2/6 p-3 text-center">Approved</th>
               <th className="w-1/6 p-3 text-right">view</th>
           </tr>
           </thead>
           <tbody>
            {posts.data && posts.data.map((post)=>(
  <tr key={post.id} className='border-b border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-600 dark:border-slate-600'>
<td className='w-3/6 py-5 px-3'>
  {post.title}
</td>
<td className='w-3/6 py-5 px-3 text-center'>
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
        {/* pagination */}
           <div className='flex justify-start mt-4 '>
           <Paginatelinks posts={posts}/>
          </div>
           </>
  )
}
