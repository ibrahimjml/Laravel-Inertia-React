import { Link, router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { route } from 'ziggy-js';
import Paginatelinks from '../../components/Paginatelinks';
import Navbar from './partials/Navbar';
import Inputsearch from '../../components/Inputsearch';
import moment from "moment";

export default function Userposts({user,posts,filters}) {
  const [isChecked, setIsChecked] = useState(filters.unapproved || false); 
  const [loading, setLoading] = useState(null); 

  const{data,setData,put}=useForm({
    search:filters.search || '',
    unapproved:filters.unapproved || false
  });
  const handleclick=(postid)=>{
    setLoading(postid);
    put(route('approve.update',postid),{
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => setLoading(null),
      onError: () => setLoading(null),
    });
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
 const handeldelete = (postid)=>{
  if(!confirm(`Are you sure you want delete post #${postid}` )){
    return;
  }
  router.delete(route('post.delete',postid),{
    preserveScroll:true
  })
 }

  return (
    <>
  <Navbar user={user}/>
    <div className='mb-3 flex items-center '>  
  {/* search box */}
<Inputsearch Search={Search} data={data.search} setData={(eo)=>{setData('search',eo.target.value)}}/>

  {/* checkbox */}
    <div className='flex gap-2 w-fit ml-auto bg-slate-600 p-3 rounded-md mb-2'>
        <input id='unapproved' type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
          <label htmlFor="unapproved">Unapproved</label>
    </div>  
</div>
<div className='bg-white mx-auto p-8 flex flex-col items-end gap-2 rounded-lg shadow-lg dark:bg-slate-800 mb-4'>
<table className='w-full mx-auto table-fixed border-collapse overflow-hidden rounded-md text-sm ring-1 ring-slate-300 dark:ring-slate-600 bg-white shadow-lg'>
<thead className='bg-slate-600 text-slate-300 uppercase text-xs text-left'>
  <tr className="bg-slate-600 text-slate-300 uppercase text-xs text-left">
    <th className="w-3/6 p-3">post detail</th>
    <th className="w-2/6 p-3 text-center">Approved</th>
    <th className="w-2/6 p-3 text-center">likes</th>
    <th className="w-2/6 p-3 text-center">createdat</th>
    <th className="w-2/6 p-3 text-center">updatedat</th>
    <th className="w-1/6 p-3 text-right">action</th>
  </tr>
</thead>
  <tbody>
{posts.data && posts.data.map((post)=>(
  <tr key={post.id} className='border-b border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-600 dark:border-slate-600'>
<td className='w-3/6 py-5 px-3'>
<div className='flex items-center gap-2'>
<img
src={post.image}
alt={post.title}
className={`w-9 h-9 rounded-full border-2 ${
  post.approved ? 'border-green-500' : 'border-yellow-500'
} object-cover`}/>
<p>{post.title}</p>  
</div>
</td>
<td className='w-2/6 py-5 px-3 text-center'>
<button onClick={()=>handleclick(post.id)} disabled={loading === post.id}>
{loading === post.id ? (
    <i className="fa-solid fa-spinner fa-spin text-gray-400"></i>
  ) : post.approved ? (
    <i className="fa-solid fa-check text-green-500"></i>
  ) : (
    <i className="fa-solid fa-hourglass-start text-yellow-500"></i>
  )}
</button>
</td>
<td className='w-2/6 py-5 px-3 text-center'>
<b>+{post.likes_sum_count} <i className='fa-solid fa-heart text-red-400'></i></b>
</td>
<td className='w-2/6 py-5 px-3 text-center'>
<p>{new Date(post.created_at).toLocaleDateString()}</p>
</td>
<td className='w-2/6 py-5 px-3 text-center'>
<p>{moment(post.updated_at).fromNow()}</p>
</td>
<td className='w-2/6 py-5 px-3 text-right'>
<div className='flex gap-4 justify-end'>
  <Link href={route('posts.show',post.id)}><i className='fa-solid fa-eye text-blue-500 dark:text-gray-300'></i></Link>
  <button onClick={()=>handeldelete(post.id)}><i className='fa-solid fa-trash text-red-500'></i></button>
</div>
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
