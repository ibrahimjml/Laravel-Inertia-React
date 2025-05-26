import React, { useState } from 'react'
import { Link, router} from '@inertiajs/react'
import Selectrole from '../../components/Selectrole'
import Searchadmin from '../../components/Searchadmin'
import { route } from 'ziggy-js';
import Navbar from './partials/Navbar';

export default function Adminpage({users,status,filters}) {
  const [isChecked, setIsChecked] = useState(filters.suspended || false);

    const params = {
      search: filters.search ?? "",
      suspended: isChecked ? true : null
    };
    
  const handleCheckbox = () => {
    const checkedState = !isChecked;
    setIsChecked(checkedState);

    router.get(route('users.page'),{...params}, {
  
      preserveState: true,
      replace: true,
    });
  };
  return (
    <>
  <Navbar/>
<div className='mb-3 flex gap-2'>
{/* search */}
<Searchadmin search={filters.search ?? ""} suspend={filters.suspended ?? null}/>
{/* remove filter search */}
{filters.search && (
<div >
<Link
href={route('users.page', { 
  ...params,
  search: null,
  page: null })}
  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500 text-white font-semibold dark:bg-red-600">
<small><b>search:</b></small> {filters.search}
<i className="fa-solid fa-close"></i>
</Link>
</div>
)}
{/* remove filter checked */}
{isChecked && (
<div >
<Link
href={route('users.page', { 
  ...params,
  suspended: null,
  page: null })}
  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500 text-white font-semibold dark:bg-red-600">
<small><b>suspended:</b></small> {filters.suspended}
<i className="fa-solid fa-close"></i>
</Link>
</div>
)}
</div>

      {status && <p className='text-sm bg-green-500'>{status}</p>}
      <div className='bg-white  mx-auto p-8 rounded-lg shadow-lg dark:bg-slate-800 mb-4'>
      <div className='flex gap-2 w-fit bg-slate-600 p-2 rounded-md mb-2'>
        <input id='suspended' type="checkbox" checked={isChecked} onChange={handleCheckbox}/>
          <label htmlFor="suspended">suspended</label>
    </div>
       <table className='w-full mx-auto table-fixed border-collapse overflow-hidden rounded-md text-sm ring-1 ring-slate-300 dark:ring-slate-600 bg-white shadow-lg'>
        <thead className='bg-slate-600 text-slate-300 uppercase text-xs text-left'>
        <tr className="bg-slate-600 text-slate-300 uppercase text-xs text-left">
                <th className="w-3/6 p-3">User</th>
                <th className="w-2/6 p-3">Role</th>
                <th className="w-1/6 p-3 text-center">Is Verified</th>
                <th className="w-1/6 p-3 text-center">Posts</th>
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
                <td className='w-2/6 py-5 px-3 text-left'>
               <Selectrole user={user}/>
                </td>
                <td className='text-center'>
                  {user.email_verified_at != null && 
                  <span><i className='fa-solid fa-check text-green-500'></i></span>
                  }
                  {user.email_verified_at === null && 
                  <span><i className='fa-solid fa-times text-red-500'></i></span>
                  }
                </td>
                <td className='w-1/6 py-5 px-3 text-center'>
                <div className=' flex items-center justify-center gap-6'>
                  <div className='flex items-center gap-2'>
                  {user.posts.filter((l)=>l.approved).length}
                <i className='fa-solid fa-check text-green-500'></i>
                  </div>
                  <div className='flex items-center gap-2'>
                  {user.posts.filter((l)=>!l.approved).length}
                <i className="fa-solid fa-hourglass-start text-yellow-500"></i>
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
