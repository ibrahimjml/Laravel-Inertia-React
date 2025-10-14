import { Link } from '@inertiajs/react'


export default function Paginatelinks({posts}) {
  return (
    <>
    {posts.links && posts.links.map((link, index) => (
      link.url ? (
        <Link 
        key={index} 
        href={link.url}  
        dangerouslySetInnerHTML={{__html: link.label}}
        className={`p-1 mx-1  ${link.active ? "dark:text-blue-500 text-green-500 font-extrabold":"dark:text-white"} `}
        />
      ):(
        <span
        key={index}  
        dangerouslySetInnerHTML={{__html: link.label}}
        className="dark:text-gray-500 text-slate-300 p-1 mx-1"
        />
        
      )
      
      
    
    ))}
    </>
  )
}
