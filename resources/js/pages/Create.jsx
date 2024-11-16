import { Head, useForm } from "@inertiajs/react"


export default function Create() {

  const { data, setData, post, processing, errors } = useForm({
    title: "",
    description: "",
    image: "",
    tags: "",
    
  })
  const handlecreate=(eo)=>{
eo.preventDefault();
post('/posts',{
  preserveScroll: true,
})
  }
  return (
    <>
    <Head title="Create"/>
    <div className="container mx-auto pt-[40px]">
  <h1 className=" text-3xl font-bold text-center py-5 capitalize">create post</h1>
</div>

<div className="flex justify-center ">
  <form  className="p-6 w-[50%]" onSubmit={handlecreate}>
    
  
    <div className="flex flex-wrap">
      <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2 sm:mb-4">
        title:
      </label>
  
      <input id="title" type="text" className="rounded-sm p-2 border-2 form-input w-full "
          name="title"  value={data.title} onChange={(eo)=>{setData('title',eo.target.value)}}/>
  
  {errors.title && <small className="text-sm text-red-500">{errors.title}</small>} 
  </div>
    <div>
      <label htmlFor="description" className="mt-2 block text-gray-700 text-sm font-bold mb-2 sm:mb-4">description :</label>
      <textarea id="description" name="description" 
      className="rounded-sm p-2 border-2 form-input w-full "
      value={data.description} 
      onChange={(eo)=>{setData('description',eo.target.value)}}
      ></textarea>
    {errors.description && <small className="text-sm text-red-500">{errors.description}</small>} 
    </div>
    <div>
      <label htmlFor="image" className="mt-2 block text-gray-700 text-sm font-bold mb-2 sm:mb-4">image :</label>
      <input type="file" name="image" 
      className="rounded-sm p-2 border-2 form-input w-full "
      onChange={(eo)=>{setData('image',eo.target.files[0])}}
      />
      {errors.image && <small className="text-sm text-red-500">{errors.image}</small>} 
    </div>
    <div className="flex flex-wrap">
      <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2 mt-2 sm:mb-4">
        hashtag:
      </label>
  
      <input id="tags" type="text" className="rounded-sm p-2 border-2 form-input w-full "
          name="tags" value={data.tags} onChange={(eo)=>{setData('tags',eo.target.value)}}/>
  {errors.tags && <small className="text-sm text-red-500">{errors.tags}</small>} 

  </div>
    <div className="mt-4 flex justify-center">
      <button type="submit"
      disabled={processing}
      className="w-[200px]  select-none font-bold  p-3 rounded-lg text-xl  no-underline text-gray-100 bg-gray-700 hover:bg-gray-500 sm:py-4">
      create
      </button>
    </div>
  </form>
</div>

    </>
  )
}
