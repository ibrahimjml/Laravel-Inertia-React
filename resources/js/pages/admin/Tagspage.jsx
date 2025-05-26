import React, { useState } from 'react'
import Navbar from './partials/Navbar'
import { Link, router, useForm } from '@inertiajs/react'
import Paginatelinks from '../../components/Paginatelinks'
import Inputsearch from '../../components/Inputsearch'
import Tagsmodel from '../../components/Tagsmodel'
import Edittagmodel from './partials/Edittagmodel'
import { route } from 'ziggy-js'
import Addtagmodel from './partials/Addtagmodel'
import Removefilters from './partials/Removefilters'

export default function Tagspage({tags,filter}) {
  const [showmodel,setShowmodel] = useState(false);
  const [showeditmodel,setShoweditmodel] = useState(false);
  const [showaddmodel,setShowaddmodel] = useState(false);
   const [selectedTag, setSelectedTag] = useState(null)

  const openModel = (tag) => { 
    setSelectedTag(tag)
    setShowmodel(true)
  }
    const openEditModel = (tag) => { 
    setSelectedTag(tag)
    setShoweditmodel(true)
  }
    const openAddModel = () => { 
    
    setShowaddmodel(true)
  }
  const closemodel = () => {
    setShowmodel(false)
    setShoweditmodel(false)
    setShowaddmodel(false)
    setSelectedTag(null)
  }
    const{data,setData} = useForm({
      tag: filter.tag || "",
      sort: filter.sort || 'latest',
      
    });
    const params = {
  ...(data.tag?.trim() ? { tag: data.tag } : {}),
  ...(data.sort? {sort:data.sort} : {})
};
    const Search = (eo) => {
      eo.preventDefault();
  
      router.get(route('tags.page'),{
        ...params,
        tag: data.tag,
      },{
        preserveState:true
      });
    };
    // handel delete tag
    const handeldelete=(tag)=>{
      if(!confirm(`Are you sure want to delete #${tag.name} ?`)){
        return;
      }
      router.delete(route('tag.delete',tag.id),{
        preserveScroll:true
      })
    }
    // handel change sort 
     const handleChange = (e) => {
    const newSort = e.target.value;
    setData('sort', newSort);
    router.get(route('tags.page'), {
      ...params,
      sort: newSort
    }, {
      preserveState: true,
      
    });
  };
  const sortValue = typeof data.sort === 'string' ? data.sort.trim() : '';
  return (
    <>
    <div>
  <Navbar/>
<div className='mb-3 flex gap-2 items-center'>
{/* search box */}
<Inputsearch Search={Search} data={data.tag} setData={(eo)=>{setData('tag',eo.target.value)}}/>

{/* sort tags */}
<div className='block ml-2'>
  <select
    id="sort"
    value={String(data.sort || 'latest')}
    onChange={handleChange}
    className="px-3 py-3  rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
  >
    <option value="latest">Latest</option>
    <option value="oldest">Oldest</option>
    <option value="popular">Popular</option>
  </select>
</div>
{/* remove filters */}
<Removefilters filter={filter} params={params} sortValue={sortValue}/>
{/* add tag */}
<button onClick={openAddModel} className='w-fit ml-auto px-3 py-3 text-white dark:text-white rounded-lg bg-slate-600'>Add Tag</button>
</div>
  <table className='w-full mx-auto table-fixed border-collapse overflow-hidden rounded-md text-sm ring-1 ring-slate-300 dark:ring-slate-600 bg-white shadow-lg'>
  <thead className='bg-slate-600 text-slate-300 uppercase text-xs text-left'>
    <tr className="bg-slate-600 text-slate-300 uppercase text-xs text-left">
      <th className="w-2/6 p-3 ">Hashtags</th>
      <th className="w-2/6 p-3 text-left">Related posts</th>
      <th className="w-1/6 p-3 text-left">CreatedAt</th>
      <th className="w-1/6 p-3 text-center">Actions</th>
    </tr>
   </thead>
  <tbody>
{tags.data && tags.data.map(tag=>{
  return(
<tr key={tag.id} className='border-b border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-600 dark:border-slate-600'>
<td className='w-2/6 py-5 px-3'>
<span className=" py-1 px-3 text-white  text-sm rounded-md bg-slate-600 font-semibold w-fit">
{tag.name}
</span>
</td>
<td className='w-2/6 py-5 px-3 '>
<div onClick={()=>openModel(tag)} className="flex items-center justify-start">
  {tag.posts && tag.posts.map(post => (
    <img
      key={post.id}
      src={post.image}
      alt={post.title}
      className="w-10 h-10 rounded-full cursor-pointer object-cover border-2 border-green-400 dark:border-blue-600 -ml-5 first:ml-0"
    />
  ))}
  {tag.posts_count >0 ? (
  <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">
    <b>+{tag.posts_count}</b>
  </span>
  ):(
  <span className='ml-3'><i className='fa-solid fa-times text-green-500 dark:text-red-500'></i></span>
  )}
</div>
</td>
<td className='w-1/6 py-5 px-3 text-left'>
  <p>{new Date(tag.created_at).toLocaleDateString()}</p>
</td>
<td className='text-center'>
<div className='flex gap-4 justify-center'>
  <button  onClick={()=>openEditModel(tag)}><i className='fa-solid fa-edit text-blue-500'></i></button>
  <button onClick={()=>handeldelete(tag)}><i className='fa-solid fa-trash text-red-500'></i></button>
</div>
</td>
  </tr>
  )  
  
})}      
 </tbody>
 </table>
 </div>

<div className='flex justify-start items-center mt-4 '>
<Paginatelinks posts={tags}/>
</div>
{/* tagsmodel */}
{showmodel && selectedTag &&
<Tagsmodel closemodel={closemodel} tag={selectedTag}/>
}
{/* edit tag model */}
{showeditmodel && selectedTag &&
<Edittagmodel closemodel={closemodel} tag={selectedTag}/>
}
{/* add tag model */}
{showaddmodel && 
<Addtagmodel closemodel={closemodel} />
}
</>
  )
}
