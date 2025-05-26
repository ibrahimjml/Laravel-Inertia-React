import { Head, useForm } from "@inertiajs/react"
import { useState } from "react";


export default function Create() {
const [tagInput, setTagInput] = useState("");
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    description: "",
    image: "",
    tags: [],
    
  })
  const handlecreate=(eo)=>{
eo.preventDefault();
post(route('posts.store'),{
   ...data,
  tags: data.tags,
  preserveScroll: true,
})}
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!data.tags.includes(newTag)) {
        setData("tags", [...data.tags, newTag]);
      }
      setTagInput(""); // Clear input after adding
    }
  };

  const removeTag = (indexToRemove) => {
    setData("tags", data.tags.filter((_, i) => i !== indexToRemove));
  };
  return (
    <>
  <Head title="Create"/>
<div className=" bg-white border mx-auto border-gray-200 rounded-lg shadow md:flex-row md:w-[70%]  dark:border-gray-700 dark:bg-gray-800 "> 
<div className="container mx-auto pt-[40px]">
<h1 className=" text-3xl font-bold text-center py-5 capitalize">create post</h1>
</div>

<div className="flex justify-center ">
  <form  className="p-6 w-[70%]" onSubmit={handlecreate}>
    
  
    <div className="flex flex-wrap">
      <label htmlFor="title" className="block text-gray-700 dark:text-white text-sm font-bold mb-2 sm:mb-4">
        Title:
      </label>
  
      <input id="title" type="text" className="rounded-sm p-2 text-black dark:bg-Gray border-2 form-input w-full "
          name="title"  value={data.title} onChange={(eo)=>{setData('title',eo.target.value)}}/>
  
  {errors.title && <small className="text-sm text-red-500">{errors.title}</small>} 
  </div>
    <div>
      <label htmlFor="description" className="mt-2 block text-gray-700 dark:text-white text-sm font-bold mb-2 sm:mb-4">description :</label>
      <textarea id="description" name="description" 
      className="rounded-sm p-2 border-2 text-black form-input w-full dark:bg-Gray"
      value={data.description} 
      onChange={(eo)=>{setData('description',eo.target.value)}}
      ></textarea>
    {errors.description && <small className="text-sm text-red-500">{errors.description}</small>} 
    </div>
    <div>
      <label htmlFor="image" className="mt-2 block text-gray-700 dark:text-white  text-sm font-bold mb-2 sm:mb-4">image :</label>
      <input type="file" name="image" 
      className="rounded-sm p-2 border-2 form-input w-full text-black dark:bg-Gray"
      onChange={(eo)=>{setData('image',eo.target.files[0])}}
      />
      {errors.image && <small className="text-sm text-red-500">{errors.image}</small>} 
    </div>
    {/* Hashtag chips */}
      <div className="flex flex-wrap gap-2 mb-2">
        {data.tags.map((tag, index) => (
          <div key={index} className="flex items-center gap-1 bg-gray-200 text-black px-2 py-1 rounded-full">
          <span>#{tag}</span>
          <button type="button" onClick={() => removeTag(index)} className="text-red-500 hover:text-red-700 font-bold ml-1">&times;</button>
          </div>
          ))}
        </div>
    <div className="flex flex-wrap">
      <label htmlFor="tags" className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2 sm:mb-4">
        hashtag:
      </label>
  
      <input id="tags" type="text"
        className="rounded-sm p-2 border-2 form-input w-full text-black dark:bg-Gray"
         value={tagInput} 
          onChange={(e) => setTagInput(e.target.value)}
         onKeyDown={handleKeyDown}
          placeholder="Press Enter to add hashtag"
         />
  {errors.tags && <small className="text-sm text-red-500">{errors.tags}</small>} 

  </div>
    <div className="mt-4 flex justify-center">
      <button type="submit"
      disabled={processing}
      className="w-[200px]  select-none font-bold  p-3 rounded-lg text-xl  no-underline text-gray-100 bg-gray-700 hover:bg-gray-500 sm:py-4">
      {processing ? 'Creating...' : 'Create'}
      </button>
    </div>
  </form>
</div>
</div> 
    </>
  )
}
