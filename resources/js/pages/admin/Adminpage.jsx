import React from 'react'
import { Link} from '@inertiajs/react'
import Selectrole from '../../components/Selectrole'
import Searchinput from '../../components/Searchinput'

export default function Adminpage({users,status,requestsearch}) {

  return (
    <>
    <div className='bg-white flex items-center justify-center mx-auto p-8 rounded-lg shadow-lg dark:bg-slate-800 mb-4'>
      <p className='text-3xl text-black dark:text-slate-200 capitalize'>admin dashboard</p>
      </div>
      {/* search */}
<div className='mb-3'>
  <Searchinput search={requestsearch}/>
</div>
      {status && <p className='text-sm bg-green-500'>{status}</p>}
      <div className='bg-white flex items-center justify-between mx-auto p-8 rounded-lg shadow-lg dark:bg-slate-800 mb-4'>
       <table className='w-full mx-auto table-fixed border-collapse overflow-hidden rounded-md text-sm ring-1 ring-slate-300 dark:ring-slate-600 bg-white shadow-lg'>
        <thead className='bg-slate-600 text-slate-300 uppercase text-xs text-left'>
        <tr className="bg-slate-600 text-slate-300 uppercase text-xs text-left">
                <th className="w-3/6 p-3">User</th>
                <th className="w-2/6 p-3">Role</th>
                <th className="w-1/6 p-3">Posts</th>
                <th className="w-1/6 p-3 text-right">View</th>
            </tr>
            </thead>
          <tbody >
            {users.data && users.data.map((user)=>(
            <tr key={user.id} className='border-b border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-600 dark:border-slate-600'>
               <td className="w-3/6 py-5 px-3">
                    <p className="font-bold mb-1">{ user.name }</p>
                    <p className="font-light text-xs">{ user.email }</p>
                </td>
                <td className='w-2/6 py-5 px-3'>
                <Selectrole user={user}/>
                
                </td>
                <td className='w-1/6 py-5 px-3'>
                <div className=' flex items-center gap-6'>
                  <div className='flex gap-2'>
                  {user.posts.filter((l)=>l.approved).length}
                  <img src="/approve.png" alt="" />
                  </div>
                  <div className='flex gap-2'>
                  {user.posts.filter((l)=>!l.approved).length}
                  <img src="/clock.png" alt="" />
                  </div>
                </div>
                  
                </td>
                <td className='w-1/6 py-5 px-3 text-right'>
                  <Link href={route('show.posts',user.id)}>view</Link>
                </td>
            </tr>
              
            ))}
          
          </tbody>
       </table>
    </div>
    <div className='flex justify-start mt-4'>
    {users.links && users.links.map((link, index) => (
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
