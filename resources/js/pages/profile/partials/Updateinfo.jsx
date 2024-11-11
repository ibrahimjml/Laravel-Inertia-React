import { useForm, usePage } from '@inertiajs/react'
import React from 'react'
import { route } from 'ziggy-js'

export default function Updateinfo({user}) {
  
  const { data, setData, patch, processing, errors } = useForm({
    name: user.name,
    username: user.username,
    email: user.email,
    
  })
  function handleLogin(e) {
    e.preventDefault()
    patch(route('update.profile'),{
      preserveScroll: true,
    
    })
  }
  return (
    <div className="bg-white mx-auto p-8 rounded-lg shadow-lg dark:bg-slate-800 mb-4">
       <div className="mb-6">
       <p className='text-md font-semibold mb-2 capitalize'>Update your account's profile information and email address.</p>
    <form className="space-y-6" onSubmit={handleLogin}>

                    <div className="">
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Name:
                        </label>

                        <input id="name" type="name"
                            className="block w-1/2 rounded-md pr-3 pl-9 text-sm  h-9 dark:text-slate-900 border border-slate-700 outline-0 focus:ring-1 focus:ring-inset focus:ring-indigo-400 focus:border-indigo-400 placeholder:text-slate-400" name="name"
                             autoComplete="name" value={data.name} onChange={(eo)=>{setData('name',eo.target.value)}}/>

                              {errors.name && <small className="text-sm text-red-500">{errors.name}</small>}  
                    </div>
                    <div className="">
                        <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Username:
                        </label>

                        <input id="username" type="username"
                            className="block w-1/2 h-9 rounded-md pr-3 pl-9 text-sm dark:text-slate-900 border border-slate-700 outline-0 focus:ring-1 focus:ring-inset focus:ring-indigo-400 focus:border-indigo-400 placeholder:text-slate-400" name="username"
                             autoComplete="username" value={data.username} onChange={(eo)=>{setData('username',eo.target.value)}}/>

                              {errors.username && <small className="text-sm text-red-500">{errors.username}</small>}  
                    </div>
                    <div className="">
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Email:
                        </label>

                        <input id="email" type="email"
                            className="block w-1/2 h-9 rounded-md pr-3 pl-9 text-sm dark:text-slate-900 border border-slate-700 outline-0 focus:ring-1 focus:ring-inset focus:ring-indigo-400 focus:border-indigo-400 placeholder:text-slate-400 " name="email"
                             autoComplete="new-email" value={data.email} onChange={(eo)=>{setData('email',eo.target.value)}}/>

                              {errors.email && <small className="text-sm text-red-500">{errors.email}</small>}
                    </div>
                    <button 
                    disabled={processing}
                    type='submit' 
                    className="px-6 py-2 rounded-lg bg-slate-700 dark:bg-slate-900 text-white disabled:bg-slate-300 disabled:cursor-wait">
        Update
    </button>
    {user.email_verified_at === null &&
    <p>Your Email Is Not Verified</p>
}
</form>
</div>
</div>
  )
}
