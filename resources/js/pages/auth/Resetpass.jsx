import { Link, useForm } from '@inertiajs/react'
import React from 'react'
import { route } from 'ziggy-js'

export default function Resetpass({token}) {
  const { data, setData, post, processing,errors,reset } = useForm({
    password: "",
    password_confirmation: "",
    
  })
  function handleReset(e) {
    e.preventDefault()
    post(route('reset.password.post',token),{
      preserveScroll: true,
      onFinish: reset()
    })

  }
  return (
    <>
            <main className="sm:container mx-auto  max-w-fit mt-5 mb-20 sm:max-w-lg sm:mt-10">
    <div className="flex">
        <div className="w-full">
            <section className="flex flex-col break-words bg-white sm:border-1 sm:rounded-md  sm:shadow-lg">

                <header className=" font-bold text-center bg-gray-200 text-gray-700 py-5 px-6 sm:py-6 sm:px-8 sm:rounded-t-md">
                  Reset Password
                </header>

                <form className="border-2 w-full px-6 space-y-6 sm:px-10 sm:space-y-8" onSubmit={handleReset}>

                    <div className="flex flex-wrap">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 mt-4 sm:mb-4">
                          Password:
                        </label>

                        <input id="password" type="password"
                            className="rounded-sm p-2 border-2 text-black w-full " 
                              value={data.password} onChange={(eo)=>{setData('password',eo.target.value)}}/>

                              {errors.password && <small className="text-sm text-red-500">{errors.password}</small>}  
                    </div>
                    <div className="flex flex-wrap">
                        <label htmlFor="password_confirmation" className="block text-gray-700 text-sm font-bold mb-2 mt-4 sm:mb-4">
                          Confirm Password:
                        </label>

                        <input id="password_confirmation" type="password"
                            className="rounded-sm p-2 border-2 text-black w-full " 
                              value={data.password_confirmation} onChange={(eo)=>{setData('password_confirmation',eo.target.value)}}/>

                              {errors.password_confirmation && <small className="text-sm text-red-500">{errors.password_confirmation}</small>}  
                    </div>
                    <div className="flex flex-wrap">
                        <button type="submit"
                        disabled={processing}
                            className="w-full select-none font-bold whitespace-no-wrap p-3 rounded-lg text-base leading-normal no-underline text-gray-100 bg-gray-700 disabled:bg-gray-200 disabled:cursor-wait hover:bg-gray-500 sm:py-4">
                          Reset
                        </button>
                        
                        <p className="w-full text-xs text-center text-gray-700 my-6 sm:text-sm sm:my-8">
                            Return back to login page ?
                            <Link className="text-gray-500 ml-2 hover:text-blue-700 no-underline hover:underline" href={route('login')}>
                              Login
                            </Link>
                        </p>
                    </div>
                </form>
          
            </section>
        </div>
    </div>
</main>
    </>
  )
}
