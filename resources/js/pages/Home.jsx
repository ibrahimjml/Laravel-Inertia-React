import {  Link, useForm, usePage } from '@inertiajs/react'
import Blogcard from '../components/Blogcard';
import { route } from 'ziggy-js';

export default function Home({posts,requestsearch}) {
  const tag = new URLSearchParams(window.location.search).get('tag'); 
  
  const {auth} = usePage().props;
  
  const{data,setData,get} = useForm({

    search: requestsearch 
  
  })

const Search =(eo)=>{
eo.preventDefault();
get(route('home'),{
  search:data.search,
  tag: tag
})
}
  

  return (
    <>
    {auth.user && <h1 className="text-2xl text-black dark:text-slate-200 text-center">Welcome, <span className='font-semibold'>{auth.user.name}</span></h1>}
    <div className="container  mx-auto w-[80%] ">
{/* search */}
<form className='w-1/4 ' onSubmit={Search}>   
    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="search"  onChange={(eo)=>{setData('search',eo.target.value)}} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search " required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-slate-600 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  dark:focus:ring-blue-800">Search</button>
    </div>
</form>

      </div>
    <div className='container mx-auto w-[80%] grid grid-cols-3 gap-4 mt-5'>

    {posts.data && posts.data.map((post) => (
        <div key={post.id}>
          <Blogcard post={post} request={data.search}/>
        </div>
            
        
      ))}
      
      </div>
      <div className='flex justify-center mt-4 '>
      {posts.links && posts.links.map((link, index) => (
          <Link 
          key={index} 
          href={link.url}  
          dangerouslySetInnerHTML={{__html: link.label}}
          className={`p-1 mx-1 ${link.active ? "text-red-700 font-extrabold":""} font-semibold`}
          />
          
        
        ))}
      </div>
      
    
    </>
  )
}
