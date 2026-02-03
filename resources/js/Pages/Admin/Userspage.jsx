import  { useState } from 'react'
import { Link, router, usePage} from '@inertiajs/react'
import Selectrole from '../../Components/Selectrole'
import Searchadmin from '../../Components/Searchadmin'
import { route } from '@/ziggylocale';
import Navbar from './Partials/Navbar'
import Paginatelinks from '../../Components/Paginatelinks';
import Create from './Partials/CreateUsermodel';
import EditUsermodel from './Partials/EditUsermodel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Adminpage({users,roles,status,filters}) {
  const {auth} = usePage().props;
  const [isChecked, setIsChecked] = useState(filters.suspended || false);
  const [ShowUserModel,setShowUserModel] = useState(false);
  const [ShowEditModel,setShowEditModel] = useState(false);
  const [selectedUser,setSelectedUser] = useState('');

    const params = {
      search: filters.search ?? "",
      suspended: isChecked ? true : null
    };
    
  const handleCheckbox = () => {
    const checkedState = !isChecked;
    setIsChecked(checkedState);

    const updatedParams = {
    search: filters.search ?? "",
    suspended: checkedState ? true : null,
      };

    router.get(route('users.page'),updatedParams, {
  
      preserveState: true,
      replace: true,
    });
  };

  function openEditModel(user){
    setSelectedUser(user);
    setShowEditModel(true);
  }
  function handeldelete(userId){
    if(!confirm(`Are you sure to delete user ${userId}`)){
      return;
    }
    router.delete(route('user.delete', { user: userId }))
  }
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
<FontAwesomeIcon icon='close' ></FontAwesomeIcon>
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
<FontAwesomeIcon icon='close' ></FontAwesomeIcon>
</Link>
</div>
)}
{/* suspend checkbox */}
<div className='flex gap-2 w-fit ml-auto text-white bg-slate-600 p-2 rounded-md mb-2'>
  <input id='suspended' type="checkbox" checked={isChecked} onChange={handleCheckbox}/>
  <label htmlFor="suspended">suspended</label>
</div>
  {auth?.user.can?.modifyusers && 
<button onClick={()=>{setShowUserModel(true)}} className='flex gap-2 w-fit text-white  bg-slate-600 p-2 rounded-md mb-2'>Create</button>
}
</div>

      {status && <p className='text-sm bg-green-500'>{status}</p>}
      <div className='bg-white mx-auto p-8 rounded-lg shadow-lg dark:bg-slate-800 mb-4 overflow-x-auto scrollbar-dark'>

       <table className='w-full min-w-[700px] mx-auto table-auto border-collapse overflow-hidden rounded-md text-sm ring-1 ring-slate-300 dark:ring-slate-600 bg-white shadow-lg'>
        <thead className='bg-slate-600 text-slate-300 uppercase text-xs text-left'>
        <tr className="bg-slate-600 text-slate-300 uppercase text-xs text-left">
                <th className="w-1/6 p-3">User</th>
                <th className="w-2/6 p-3">Role</th>
                <th className="w-1/6 p-3 text-center">Following</th>
                <th className="w-1/6 p-3 text-center">Followers</th>
                <th className="w-1/6 p-3 text-center">Is Verified</th>
                <th className="w-1/6 p-3 text-center">Posts</th>
                <th className="w-1/6 p-3 text-right">actions</th>
            </tr>
            </thead>
          <tbody >
            {users.data && users.data.map((user)=>(
            <tr key={user.id} className='border-b border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-600 dark:border-slate-600'>
               <td className="w-1/6 py-5 px-3">
                    <p className="font-bold mb-1">{ user.name }</p>
                    <p className="font-light text-xs">{ user.email }</p>
                </td>
                <td className='w-2/6 py-5 px-3 text-left'>
               <Selectrole user={user} roles={roles}/>
                </td>
                <td className="w-1/6 py-5 px-3 text-center">
                 <b>{user.followings_count}</b>
                </td>
                <td className="w-1/6 py-5 px-3 text-center">
                 <b>{user.followers_count}</b>
                </td>
                <td className='text-center'>
                  {user.email_verified_at != null && 
                  <span><FontAwesomeIcon icon='check' className=' text-green-500'></FontAwesomeIcon></span>
                  }
                  {user.email_verified_at === null && 
                  <span><FontAwesomeIcon icon='times' className=' text-red-500'></FontAwesomeIcon></span>
                  }
                </td>
                <td className='w-1/6 py-5 px-3 text-center'>
                <div className=' flex items-center justify-center gap-6'>
                  <div className='flex items-center gap-2'>
                  {user.posts.filter((l)=>l.approved).length}
                  <FontAwesomeIcon icon='check' className=' text-green-500'></FontAwesomeIcon>
                  </div>
                  <div className='flex items-center gap-2'>
                  {user.posts.filter((l)=>!l.approved).length}
                <FontAwesomeIcon icon='hourglass-start' className=" text-yellow-500"></FontAwesomeIcon>
                  </div>
                </div>
                  
                </td>
                <td className='w-1/6 py-5 px-3 text-right'>
                  <div className='flex gap-4 justify-end'>
                    <Link href={route('show.posts', { user: user.id})}>
                  <FontAwesomeIcon icon='eye' className=' text-blue-500 dark:text-gray-300'></FontAwesomeIcon>
                  </Link>
                  {auth?.user.can?.modifyusers && 
                   <>
                  <button  onClick={()=>openEditModel(user)}><FontAwesomeIcon icon='edit' className=' text-blue-500'></FontAwesomeIcon></button>
                  <button onClick={()=>handeldelete(user.id)}><FontAwesomeIcon icon='trash' className=' text-red-500'></FontAwesomeIcon></button>
                  </>
                  }
             </div>
                </td>
            </tr>
              
            ))}
          
          </tbody>
       </table>
    </div>
  {/* pagination */}
  <div className='flex justify-start mt-4 '>
  <Paginatelinks posts={users}/>
</div>
{/* create user model */}
{ShowUserModel && 
<Create closemodel={()=>setShowUserModel(false)} roles={roles}/>
}
{ShowEditModel && 
<EditUsermodel user={selectedUser} closemodel={()=>setShowEditModel(false)} roles={roles}/>
}
      </>
  )
}
