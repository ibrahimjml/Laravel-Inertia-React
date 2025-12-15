import  { useState } from 'react'
import Navbar from './Partials/Navbar'
import { Link, router, useForm } from '@inertiajs/react'
import Paginatelinks from '../../Components/Paginatelinks'
import Inputsearch from '../../Components/Inputsearch'
import Edittagmodel from './Partials/Edittagmodel'
import { route } from 'ziggy-js'
import Addtagmodel from './Partials/Addtagmodel'
import Removefilters from './Partials/Removefilters'
import Relatedpoststags from './Partials/Relatedpoststags'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Tagspage({tags,filter,relatedPostsByTag}) {
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
<div className='bg-white mx-auto p-8 flex flex-col items-end gap-2 rounded-lg shadow-lg dark:bg-slate-800 mb-4 overflow-x-auto scrollbar-dark'>
  <table className='w-full min-w-[700px] mx-auto table-auto border-collapse overflow-hidden rounded-md text-sm ring-1 ring-slate-300 dark:ring-slate-600 bg-white shadow-lg'>
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
<div onClick={()=>openModel(tag)} className="flex items-center  bg-slate-300 dark:bg-slate-600 rounded-full w-fit px-4 py-2 justify-start">
  {tag.posts && tag.posts.map(post => (
    <img
      key={post.id}
      src={post.image}
      alt={post.title}
      className={`w-10 h-10 rounded-full cursor-pointer object-cover border-2 ${ post.approved ? 'border-green-500 ' :'border-yellow-500'}   -ml-5 first:ml-0`}
    />
  ))}
{tag.posts_count >5 && (
<div className="w-10 h-10 rounded-full cursor-pointer bg-slate-100 text-black border-2 -ml-5 flex items-center justify-center">
  <b>+{tag.posts_count -5}</b>
</div>
)}  
  {tag.posts_count >0 ? (
  <div className='flex items-center gap-1 ml-3'>
        {tag.approved_posts_count > 0 && 
          <>
        <b>+{tag.approved_posts_count}</b> 
        <FontAwesomeIcon icon='check' className=' text-green-500 mr-1'></FontAwesomeIcon>
        </>
        }
        {tag.approved_posts_count >0 && tag.unapproved_posts_count >0 && <b>{' / '}</b>}
        {tag.unapproved_posts_count > 0 && (
          <>
        <b className='ml-1'>+{tag.unapproved_posts_count}</b> 
          <FontAwesomeIcon icon='hourglass-start' className=" text-yellow-500"></FontAwesomeIcon>
          </>
        )}
        
      </div>
  ):(
  <span className='ml-3'><FontAwesomeIcon icon='times' className=' text-green-500 dark:text-red-500'></FontAwesomeIcon></span>
  )}
</div>
</td>
<td className='w-1/6 py-5 px-3 text-left'>
  <p>{new Date(tag.created_at).toLocaleDateString()}</p>
</td>
<td className='text-center'>
<div className='flex gap-4 justify-center'>
  <button  onClick={()=>openEditModel(tag)}><FontAwesomeIcon icon='edit' className=' text-blue-500'></FontAwesomeIcon></button>
  <button onClick={()=>handeldelete(tag)}><FontAwesomeIcon icon='trash' className=' text-red-500'></FontAwesomeIcon></button>
</div>
</td>
  </tr>
  )  
  
})}      
 </tbody>
 </table>
</div>
 </div>

<div className='flex justify-start items-center mt-4 '>
<Paginatelinks posts={tags}/>
</div>
{/* related posts tags model */}
{showmodel && selectedTag &&
<Relatedpoststags closemodel={closemodel} tag={selectedTag}/>
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
