import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Edit({posts,tags,alltags}) {
  const { props } = usePage();
  const status = props.flash?.status;
  const [tagInput, setTagInput] = useState("");
  const [errorTag, seterrorTag] = useState('');


  const { data, setData,post, processing, errors } = useForm({
    title: posts.title,
    description: posts.description,
    image: '',
    tags: tags,
    _method : 'PUT'
  })

  const handleupdate=(eo)=>{
  eo.preventDefault();
  const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('_method', 'PUT');

    if (data.image) {
      formData.append('image', data.image);
    }

    if (data.tags.length > 0) {
        data.tags.forEach((tag, index) => {
       formData.append(`tags[${index}]`, tag);
      });
    }

  

    post(`/posts/${posts.id}`, {
      data: formData,
      preserveScroll: true,
      forceFormData: true,
    });
    }
      const handleKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (data.tags.length >= 4) {
      seterrorTag("You hit the max limit hashtags.");
      return;
    }
      if (!data.tags.includes(newTag)) {
        setData('tags', [...data.tags, newTag]);
      }
      setTagInput('');
    }
  };
const handleSelectTag = (e) => {
  const selectedTag = e.target.value;
  if (selectedTag && !data.tags.includes(selectedTag)) {
    if (data.tags.length >= 4) {
      seterrorTag("You hit the max limit hashtags.");
      return;
    }
    setData("tags", [...data.tags, selectedTag]);
  }
};
  const removeTag = (indexToRemove) => {
    setData('tags', data.tags.filter((tag,i) => i !== indexToRemove));
  };
  return (
    <>
<Head title={`Edit-${posts.title.slice(0,5)}`}/>
<div className=" bg-white border mx-auto border-gray-200 rounded-lg shadow md:flex-row md:w-[70%]  dark:border-gray-700 dark:bg-gray-800 "> 
<div className="container mx-auto pt-[40px] ">
<h1 className=" text-3xl font-bold text-center py-5 capitalize">Update Post</h1>
</div>
<div className="flex justify-center ">
  <form  className="p-6 w-[90%] " onSubmit={handleupdate}>
    <div className="flex flex-wrap">
      <label htmlFor="title" className="block text-gray-700 dark:text-slate-200 text-sm font-bold mb-2 sm:mb-4">
        title:
      </label>
  
      <input id="title" type="text" className="rounded-sm p-2 border-2 text-black dark:bg-Gray form-input w-full "
          name="title"  value={data.title} onChange={(eo)=>{setData('title',eo.target.value)}}/>
  
  {errors.title && <small className="text-sm text-red-500">{errors.title}</small>} 
  </div>
    <div>
      <label htmlFor="description" className="mt-2 block text-gray-700 dark:text-slate-200 text-sm font-bold mb-2 sm:mb-4">description :</label>
      <textarea id="description" name="description" 
      className="rounded-sm p-2 border-2 text-black dark:bg-Gray form-input w-full "
      value={data.description} 
      onChange={(eo)=>{setData('description',eo.target.value)}}
      ></textarea>
    {errors.description && <small className="text-sm text-red-500">{errors.description}</small>} 
    </div>
    <div>
      {posts.image && 
        <img src={posts.image} alt={posts.title} className='object-cover object-center h-40'/>
      }
    
      <label htmlFor="image" className="mt-2 block text-gray-700 dark:text-slate-200 text-sm font-bold mb-2 sm:mb-4">image :</label>
      <input type="file" name="image" 
      className="rounded-sm p-2 border-2 form-input w-full "
      onChange={(eo)=>{setData('image',eo.target.files[0])}}
      />
      {errors.image && <small className="text-sm text-red-500">{errors.image}</small>} 
    </div>

<div className="flex flex-wrap gap-2 my-2">
{data.tags.map((tag, index) => (
  <div key={index} className="flex items-center gap-1 bg-gray-200 text-black px-2 py-1 rounded-full">
  <span><b>{index +1}.</b> #{tag}</span>
<button  type="button"  onClick={() => removeTag(index)}  className="text-red-500 hover:text-red-700 font-bold ml-1" >
  &times;
  </button>
  </div>
    ))}
</div>

  <div className="flex flex-wrap">
    <label htmlFor="tags" className="block text-gray-700 dark:text-slate-200 text-sm font-bold mb-2 mt-2">
      Hashtag:
      </label>
    <input  id="tags" type="text" className="rounded-sm p-2 text-black dark:bg-Gray border-2 form-input w-full"
      placeholder="Press Enter to add hashtag"
      value={tagInput}
      onChange={(e) => setTagInput(e.target.value)}
      onKeyDown={handleKeyDown}/>
  <div className="mt-4 mb-2 w-full">
  <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
    Or choose a tag:
  </label>
  <select
    onChange={handleSelectTag}
    value={data.tags}
    multiple
    className="rounded-sm p-2 border-2 form-select w-full dark:bg-gray-800 dark:text-white">
    <option value=''>## Choose a tag ##</option>
    {alltags.map((tag, index) => (
      <option  key={index} value={tag}>
        <b>{index +1}.</b> #{tag}
      </option>
    ))}
  </select>
  </div>
  {errors.tags && <small className="text-sm text-red-500">{errors.tags}</small>}
  {errorTag && <small className="text-sm block text-left text-red-500">{errorTag}</small>} 
  </div>
  {status && <small className="text-sm text-red-500">{status}</small>}

    <div className="mt-4 flex justify-center">
      <button type="submit"
      disabled={processing}
      className="w-[200px]  select-none font-bold  p-3 rounded-lg text-xl  no-underline text-gray-100 bg-gray-700 hover:bg-gray-500 sm:py-4">
    {processing ? (<FontAwesomeIcon icon='spinner' spin className=" text-white"></FontAwesomeIcon>) : 'Update'}
      </button>
    </div>
  </form>
</div>
</div>
    </>
  )
}
