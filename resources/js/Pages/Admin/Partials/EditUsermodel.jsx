import { useForm } from '@inertiajs/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CreateUsermodel({roles,closemodel,user}) {
  const { data, setData, put, processing, errors } = useForm({
      name: user.name,
      username: user.username,
      email: user.email,
      role :  user.role || ''

      })
  
    const handleUpdate = (e) => {
      e.preventDefault()
  
      put(route('user.update',user.id), {
        preserveScroll: true,
        onSuccess: () => closemodel(),
      })
    }

  return (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-20 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[80%] lg:w-[40%] max-h-[80vh]  overflow-y-auto relative scrollbar-dark">
        <button
          onClick={closemodel}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
     <FontAwesomeIcon icon='close' className='text-black dark:text-white'></FontAwesomeIcon>
        </button>
        <h3 className="text-lg font-bold mb-4 text-center">Edit user {user.name}</h3>
          {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-4">
            <div className="flex flex-wrap">
                        <label htmlFor="name" className="block text-white text-sm font-bold mb-2 mt-4 sm:mb-4">
                          Name:
                        </label>

                        <input id="name" type="name"
                            className="rounded-sm dark:text-black  p-2 border-2 form-input w-full " 
                            autoComplete="name" value={data.name} onChange={(eo)=>{setData('name',eo.target.value)}}/>
                        {errors.name && <small className="text-sm text-red-500">{errors.name}</small>}
                      
                    </div>
                    <div className="flex flex-wrap">
                        <label htmlFor="username" className="block text-white text-sm font-bold mb-2  sm:mb-4">
                          Username:
                        </label>

                        <input id="username" type="username"
                            className="rounded-sm dark:text-black p-2 border-2 form-input w-full " 
                             autoComplete="username" value={data.username} onChange={(eo)=>{setData('username',eo.target.value)}}/>
                                {errors.username && <small className="text-sm text-red-500">{errors.username}</small>}
                      
                    </div>

                    <div className="flex flex-wrap">
                        <label htmlFor="email" className="block text-white text-sm font-bold mb-2  sm:mb-4">
                          E-Mail Address:
                        </label>

                        <input id="email" type="email"
                            className="rounded-sm dark:text-black  p-2 border-2 form-input w-full " 
                              autoComplete="email" value={data.email} onChange={(eo)=>{setData('email',eo.target.value)}}/>

                                {errors.email && <small className="text-sm text-red-500">{errors.email}</small>}
                    </div>
        
                 <select
                 className="bg-gray-100 rounded p-2 dark:bg-slate-700 dark:text-slate-200 w-full"
                 value={data.role}
                 onChange={(e) => setData('role', e.target.value)} 
               >
                 {roles && roles.map(role =>(
                   <option key={role.value} value={role.value}>{role.label}</option>
                 ))}
               </select>
          <div className="flex justify-start gap-3">
            <button
              type="button"
              onClick={closemodel}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 rounded bg-green-500 dark:bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {processing ? (<FontAwesomeIcon icon='spinner' spin className=" text-white"></FontAwesomeIcon>) : 'Update'}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
