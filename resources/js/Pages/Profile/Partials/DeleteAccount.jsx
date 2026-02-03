import { useForm } from '@inertiajs/react';
import { useState } from 'react'
import { route } from '@/ziggylocale';


export default function DeleteAccount() {
  const[showmodel,setshowmodel]=useState(false);
  const toggleModel =()=>{
    setshowmodel(!showmodel);
  }
  const { data, setData, delete:destroy, processing, errors } = useForm({
    current_password: "",

  })
  function handlePassword(e) {
    e.preventDefault()
    destroy(route('delete.account'),{
      preserveScroll: true,
    
    })
  }
  return (
    <div className="bg-white mx-auto p-8 rounded-lg shadow-lg dark:bg-slate-800 mb-4">
       <div className="mb-6">
       <p className='text-md font-semibold mb-2 capitalize'>Delete Your Account. </p>
        <p className='mb-3'>Once your account is deleted, all of its resources data will be
            permanently deleted. This action cannot be undone.
            </p>
            <button 
            onClick={toggleModel}
    className="px-6 py-2 rounded-lg bg-red-700 text-white disabled:bg-slate-300 disabled:cursor-wait">
Delete
</button>
{showmodel &&
      <>
    
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-slate-700 p-6 rounded shadow-lg w-1/3">
          <h1 className='text-xl '>Delete Account</h1>
          <p className='mb-3'>Once your account is deleted, all of its resources data will be
            permanently deleted. This action cannot be undone.
            </p>
          <form className="space-y-6" onSubmit={handlePassword}>

<div className="">
    <label htmlFor="current_password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
      Current-Password:
    </label>

    <input id="current_password" type="password"
        className="block w-1/2 rounded-md pr-3 pl-9 text-sm  h-9 dark:text-slate-900 border border-slate-700 outline-0 focus:ring-1 focus:ring-inset focus:ring-indigo-400 focus:border-indigo-400 placeholder:text-slate-400" name="current_password"
          value={data.current_password} onChange={(eo)=>{setData('current_password',eo.target.value)}}/>

          {errors.current_password && <small className="text-sm text-red-500">{errors.current_password}</small>}  
</div>
<button 
    disabled={processing}
    type='submit' 
    className="px-6 py-2 rounded-lg bg-slate-700 dark:bg-slate-900 text-white disabled:bg-slate-300 disabled:cursor-wait">
Confirm
</button>
</form>
            <button
              onClick={toggleModel}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
        </>
    }
       </div>
       </div>
  )
}
