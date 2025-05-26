import { Link, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react'
import { route } from 'ziggy-js';
import Paginatelinks from '../../components/Paginatelinks';
import Navbar from './partials/Navbar';
import Inputsearch from '../../components/Inputsearch';

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
  <Navbar user={user}/>
    <div className='mb-3'>
  {/* search box */}
<Inputsearch Search={Search} data={data.search} setData={(eo)=>{setData('search',eo.target.value)}}/>
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
  <i className='fa-solid fa-check text-green-500'></i>
):(
    <i class="fa-solid fa-hourglass-start text-yellow-500"></i>
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
