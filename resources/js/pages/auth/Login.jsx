import { Link, useForm } from "@inertiajs/react"
import { route } from "ziggy-js";

export default function Login() {

  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    
  })
  function handleLogin(e) {
    e.preventDefault()
    post('/login',{
      preserveScroll: true,
    
    })

  }
  return (
    <>

    <main className="sm:container mx-auto  max-w-fit mt-5 mb-20 sm:max-w-lg sm:mt-10">
    <div className="flex">
        <div className="w-full">
            <section className="flex flex-col break-words bg-white sm:border-1 sm:rounded-md  sm:shadow-lg">

                <header className=" font-bold text-center bg-gray-200 text-gray-700 py-5 px-6 sm:py-6 sm:px-8 sm:rounded-t-md">
                    Login
                </header>

                <form className="border-2 w-full px-6 space-y-6 sm:px-10 sm:space-y-8" onSubmit={handleLogin}>

                    <div className="flex flex-wrap">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 mt-4 sm:mb-4">
                          E-Mail Address:
                        </label>

                        <input id="email" type="email"
                            className="rounded-sm p-2 border-2 form-input w-full " name="email"
                             autoComplete="email" value={data.email} onChange={(eo)=>{setData('email',eo.target.value)}}/>

                              {errors.email && <small className="text-sm text-red-500">{errors.email}</small>}  
                    </div>

                    <div className="flex flex-wrap">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 sm:mb-4">
                          Password:
                        </label>

                        <input id="password" type="password"
                            className="rounded-sm p-2 border-2 form-input w-full " name="password"
                             autoComplete="new-password" value={data.password} onChange={(eo)=>{setData('password',eo.target.value)}}/>

                              {errors.password && <small className="text-sm text-red-500">{errors.password}</small>}
                    </div>

                    
                    <div className="flex flex-wrap">
                        <button type="submit"
                        disabled={processing}
                            className="w-full select-none font-bold whitespace-no-wrap p-3 rounded-lg text-base leading-normal no-underline text-gray-100 bg-gray-700 hover:bg-gray-500 sm:py-4">
                          Login
                        </button>
                        
                        <p className="w-full text-xs text-center text-gray-700 my-6 sm:text-sm sm:my-8">
                            Dont have an account?
                            <Link className="text-gray-500 hover:text-blue-700 no-underline hover:underline" href={route('register')}>
                              Register
                            </Link>
                        </p>
                    </div>
                </form>
                <p className='text-center text-xl text-rose-600'></p>
            </section>
        </div>
    </div>
</main>
    </>
  )
}
