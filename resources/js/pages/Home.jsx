import {  Link, usePage } from '@inertiajs/react'
import Blogcard from '../components/Blogcard';

export default function Home({posts}) {
  console.log(posts);

  const {auth} = usePage().props;

  return (
    <>
    {auth.user && <h1 className="text-2xl text-black text-center">Welcome, <span className='font-semibold'>{auth.user.name}</span></h1>}
    <div className='container mx-auto w-[80%] grid grid-cols-3 gap-4 mt-5'>
    {posts.data && posts.data.map((post) => (
        <div key={post.id}>
          <Blogcard post={post}/>
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
