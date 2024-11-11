import { Link } from '@inertiajs/react'
import React from 'react'

export default function Paginatelinks({posts}) {
  return (
    <>
    {posts.links && posts.links.map((link, index) => (
      <Link 
      key={index} 
      href={link.url}  
      dangerouslySetInnerHTML={{__html: link.label}}
      className={`p-1 mx-1 ${link.active ? "text-red-700 font-extrabold":""} font-semibold`}
      />
      
    
    ))}
    </>
  )
}
