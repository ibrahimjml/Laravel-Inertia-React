import { Link } from "@inertiajs/react"
import { route } from "ziggy-js"

export default function Removingfilters({filters,sortValue,username,params}){
  return(
<>
  {filters.tag && (
        <Link 
        className='flex items-center gap-3 bg-green-500 dark:bg-red-500 px-3 py-3 text-slate-200 font-semibold rounded-lg'
        href={route('home',{
          ...params,
          tag:null,
          page:null
        }
      )}><small><b>tag:</b></small>{filters.tag}
      <i className='fa-solid fa-close'></i></Link>
      )}



{filters.search && 
        <Link 
        className='flex items-center gap-3 bg-green-500 dark:bg-red-500 px-3 py-3 text-slate-200 font-semibold rounded-lg'
        href={route('home',{
        ...params,
        search:null,
        page:null
        }
      )}><small><b>search:</b></small>{filters.search}  
      <i className='fa-solid fa-close'></i></Link>
      }

    
      {filters.user &&
      <Link 
      className='flex items-center gap-3 bg-green-500 dark:bg-red-500 px-3 py-3 text-slate-200 font-semibold rounded-lg'
      href={route('home',{
      ...params,
      user:null,
      page:null
      }
    )}><small><b>user:</b></small>{username}  
    <i className='fa-solid fa-close'></i></Link>
      }
  {sortValue && sortValue !== 'latest' &&(
        <Link 
        className='flex items-center gap-3 bg-green-500 dark:bg-red-500 px-3 py-3 text-slate-200 font-semibold rounded-lg'
        href={route('home',{
          ...params,
          sort:null,
          page:null
        }
      )}><small><b>sort:</b></small>{sortValue}
      <i className='fa-solid fa-close'></i></Link>
      )}
      </>
  )
  
}