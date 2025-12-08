import { useForm } from '@inertiajs/react'
import { route } from 'ziggy-js'

export default function Confirmpassword() {
  const { data, setData, post, processing, errors,reset } = useForm({
    password: "",
    
  })
  function handleConfirm(e) {
    e.preventDefault()
    post(route('confirm.password'),{
      preserveScroll: true,
      onFinish:reset()
    })
  }
  return (
    <main className="sm:container mx-auto  max-w-fit mt-5 mb-20 sm:max-w-lg sm:mt-10">

            <section className="flex flex-col break-words bg-white sm:border-1 sm:rounded-md  sm:shadow-lg">

                <header className=" font-bold text-center bg-gray-200 text-gray-700 py-5 px-6 sm:py-6 sm:px-8 sm:rounded-t-md">
                    Confirm Password
                </header>

                <form className="border-2 w-full px-6 space-y-6 sm:px-10 sm:space-y-8" onSubmit={handleConfirm}>

                    <div className="flex flex-wrap">
                    <p className='text-slate-900'>
                This is a secure area of the application. Please confirm your
                password before continuing.
            </p>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 mt-4 sm:mb-4">
                          Password:
                        </label>

                        <input id="password" type="password"
                            className="rounded-sm p-2 border-2 text-black w-full " name="password"
                             value={data.password} onChange={(eo)=>{setData('password',eo.target.value)}}/>

                              {errors.password && <small className="text-sm text-red-500">{errors.password}</small>}  
                    </div>
                    <button 
                    className='px-6 py-2 rounded-lg bg-slate-700 dark:bg-slate-900 text-white disabled:bg-slate-300 disabled:cursor-wait'
                      disabled={processing}
                      type='submit'>
                       
                      Confirm
                    </button>
                    </form>
                    </section>
                    </main>

  )
}
