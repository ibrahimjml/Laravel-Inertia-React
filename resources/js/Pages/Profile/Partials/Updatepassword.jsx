import { useForm } from '@inertiajs/react'
import { route } from 'ziggy-js'

export default function Updatepassword() {
  const { data, setData, put, processing, errors,reset } = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
    
  })
  function handlePassword(e) {
    e.preventDefault()
    put(route('update.password'),{
      preserveScroll: true,
    onSuccess:() => reset()
    })
  }
  return (
    <div className="bg-white mx-auto p-8 rounded-lg shadow-lg dark:bg-slate-800 mb-4">
        <div className="mb-6">
        <p className='text-md font-semibold mb-2 capitalize'>Update your Cureent Password Information.</p>
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
    <div className="">
        <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Password:
        </label>

        <input id="password" type="password"
            className="block w-1/2 h-9 rounded-md pr-3 pl-9 text-sm dark:text-slate-900 border border-slate-700 outline-0 focus:ring-1 focus:ring-inset focus:ring-indigo-400 focus:border-indigo-400 placeholder:text-slate-400" name="password"
              value={data.password} onChange={(eo)=>{setData('password',eo.target.value)}}/>

              {errors.password && <small className="text-sm text-red-500">{errors.password}</small>}  
    </div>
    <div className="">
        <label htmlFor="password_confirmation" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Confirm-Password:
        </label>

        <input id="password_confirmation" type="password"
            className="block w-1/2 h-9 rounded-md pr-3 pl-9 text-sm dark:text-slate-900 border border-slate-700 outline-0 focus:ring-1 focus:ring-inset focus:ring-indigo-400 focus:border-indigo-400 placeholder:text-slate-400 " name="password_confirmation"
              value={data.password_confirmation} onChange={(eo)=>{setData('password_confirmation',eo.target.value)}}/>

              {errors.password_confirmation && <small className="text-sm text-red-500">{errors.password_confirmation}</small>}
    </div>
    <button 
    disabled={processing}
    type='submit' 
    className="px-6 py-2 rounded-lg bg-slate-700 dark:bg-slate-900 text-white disabled:bg-slate-300 disabled:cursor-wait">
Update
</button>

</form>
</div>
</div>
  )
}
