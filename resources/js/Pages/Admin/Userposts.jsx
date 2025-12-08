import { Link, router, useForm } from '@inertiajs/react';
import  {  useState } from 'react'
import { route } from 'ziggy-js';
import Paginatelinks from '../../Components/Paginatelinks';
import Navbar from './Partials/Navbar'
import Inputsearch from '../../Components/Inputsearch';
import moment from "moment";
import Reportedusersmodel from './Partials/Reportedusersmodel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Userposts({user,posts,filters}) {
  const [isChecked, setIsChecked] = useState(filters.unapproved || false); 
  const [loading, setLoading] = useState(null); 
   const [selectedPost, setSelectedPost] = useState(null)
   const [showmodel,setShowmodel] = useState(false);


  const{data,setData,post}=useForm({
    search:filters.search || '',
    unapproved:filters.unapproved || false
  });

  const handleclick=(postid)=>{
    setLoading(postid);
    post(route('approve.update',postid),{
      _method: 'PUT',
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
const openModel = (Post)=>{
  setSelectedPost(Post);
  setShowmodel(true);
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
    <th className="w-1/6 p-3 text-center">Comments</th>
    <th className="w-1/6 p-3 text-center">reported</th>
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
    <FontAwesomeIcon icon='spinner' spin className=" text-gray-400"></FontAwesomeIcon>
  ) : post.approved ? (
    <FontAwesomeIcon icon='check' className=" text-green-500"></FontAwesomeIcon>
  ) : (
    <FontAwesomeIcon icon='hourglass-start' className=" text-yellow-500"></FontAwesomeIcon>
  )}
</button>
</td>
<td className='w-2/6 py-5 px-3 text-center'>
<b>+{post.likes_sum_count} <FontAwesomeIcon icon='heart' className=' text-red-400'></FontAwesomeIcon></b>
</td>
<td className='w-1/6 py-5 px-3 text-center'>
{post.comments_count && 
<b>+{post.comments_count} <FontAwesomeIcon icon='comment' className=' dark:text-slate-300 text-black'></FontAwesomeIcon></b>
|| '--'
}
</td>
<td className='w-1/6 py-5 px-3 text-center'>
<span onClick={()=>openModel(post)} className='cursor-pointer'>
  {post.reported_count >0 ? (
    <b>+{post.reported_count}</b>
  ) : '--'}</span>
</td>
<td className='w-2/6 py-5 px-3 text-center'>
<p>{new Date(post.created_at).toLocaleDateString()}</p>
</td>
<td className='w-2/6 py-5 px-3 text-center'>
<p>{moment(post.updated_at).fromNow()}</p>
</td>
<td className='w-2/6 py-5 px-3 text-right'>
<div className='flex gap-4 justify-end'>
  <Link href={route('posts.show',post.id)}><FontAwesomeIcon icon='eye' className=' text-blue-500 dark:text-gray-300'></FontAwesomeIcon></Link>
  <button onClick={()=>handeldelete(post.id)}><FontAwesomeIcon icon='trash' className=' text-red-500'></FontAwesomeIcon></button>
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
{/* show reported model */}
{showmodel &&
<Reportedusersmodel close={()=>setShowmodel(false)} post={selectedPost}/>
}
   </>
  )
}
