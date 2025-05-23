import { Head, useForm } from '@inertiajs/react';
import React from 'react'


export default function Edit({posts,tags}) {
  const { data, setData,post, processing, errors } = useForm({
    title: posts.title,
    description: posts.description,
    image: null,
    tags: tags,
    _method : 'PUT'
  })
  const handleupdate=(eo)=>{
eo.preventDefault();


post(`/posts/${posts.id}`, {
  ...data,
  preserveScroll: true,
})
  }
  return (
    <>
    <Head title={`Edit-${posts.title.slice(0,5)}`}/>
    <div className="container mx-auto pt-[40px] ">
  <h1 className=" text-3xl font-bold text-center py-5 capitalize">Update Post</h1>
</div>

<div className="flex justify-center ">
  <form  className="p-6 w-[50%] border  shadow-neutral-950 shadow-md border-slate-400 dark:border-slate-600 rounded-md" onSubmit={handleupdate}>
    
  
    <div className="flex flex-wrap">
      <label htmlFor="title" className="block text-gray-700 dark:text-slate-200 text-sm font-bold mb-2 sm:mb-4">
        title:
      </label>
  
      <input id="title" type="text" className="rounded-sm p-2 border-2 dark:bg-slate-800 form-input w-full "
          name="title"  value={data.title} onChange={(eo)=>{setData('title',eo.target.value)}}/>
  
  {errors.title && <small className="text-sm text-red-500">{errors.title}</small>} 
  </div>
    <div>
      <label htmlFor="description" className="mt-2 block text-gray-700 dark:text-slate-200 text-sm font-bold mb-2 sm:mb-4">description :</label>
      <textarea id="description" name="description" 
      className="rounded-sm p-2 border-2 dark:bg-slate-800 form-input w-full "
      value={data.description} 
      onChange={(eo)=>{setData('description',eo.target.value)}}
      ></textarea>
    {errors.description && <small className="text-sm text-red-500">{errors.description}</small>} 
    </div>
    <div>
      {posts.image && 
        <img src={`/images/${posts.image}`} alt={posts.title} className='object-cover object-center h-40'/>
      }
    
      <label htmlFor="image" className="mt-2 block text-gray-700 dark:text-slate-200 text-sm font-bold mb-2 sm:mb-4">image :</label>
      <input type="file" name="image" 
      className="rounded-sm p-2 border-2 form-input w-full "
      onChange={(eo)=>{setData('image',eo.target.files[0])}}
      />
      {errors.image && <small className="text-sm text-red-500">{errors.image}</small>} 
    </div>
    <div className="flex flex-wrap">
      <label htmlFor="tags" className="block text-gray-700 dark:text-slate-200 text-sm font-bold mb-2 mt-2 sm:mb-4">
        hashtag:
      </label>
  
      <input id="tags" type="text" className="rounded-sm p-2 dark:bg-slate-800 border-2 form-input w-full "
          name="tags" value={data.tags} onChange={(eo)=>{setData('tags',eo.target.value)}}/>
  {errors.tags && <small className="text-sm text-red-500">{errors.tags}</small>} 

  </div>
    <div className="mt-4 flex justify-center">
      <button type="submit"
      disabled={processing}
      className="w-[200px]  select-none font-bold  p-3 rounded-lg text-xl  no-underline text-gray-100 bg-gray-700 hover:bg-gray-500 sm:py-4">
      Update
      </button>
    </div>
  </form>
</div>

    </>
  )
}
