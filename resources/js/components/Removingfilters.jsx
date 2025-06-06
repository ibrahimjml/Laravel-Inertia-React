import { Link } from "@inertiajs/react"
import { route } from "ziggy-js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Removingfilters({filters,sortValue,username,params}){
  return(
<>
  {filters.tag && (
        <Link 
        className='flex items-center gap-3 bg-green-500 dark:bg-red-500 px-3 py-3 text-slate-100 font-semibold rounded-lg'
        href={route('home',{
          ...params,
          tag:null,
          page:null
        }
      )}><span><b>tag: </b>{filters.tag}</span>
      <FontAwesomeIcon icon='close' className='fa-solid fa-close'></FontAwesomeIcon></Link>
      )}



{filters.search && 
        <Link 
        className='flex items-center gap-3 bg-green-500 dark:bg-red-500 px-3 py-3 text-slate-100 font-semibold rounded-lg'
        href={route('home',{
        ...params,
        search:null,
        page:null
        }
      )}><span><b>search: </b>{filters.search}</span>  
        <FontAwesomeIcon icon='close' className='fa-solid fa-close'></FontAwesomeIcon></Link>
      }

    
      {filters.user &&
      <Link 
      className='flex items-center gap-3 bg-green-500 dark:bg-red-500 px-3 py-3 text-slate-100 font-semibold rounded-lg'
      href={route('home',{
      ...params,
      user:null,
      page:null
      }
    )}><span><b>user: </b>{username} </span> 
      <FontAwesomeIcon icon='close' className='fa-solid fa-close'></FontAwesomeIcon></Link>
      }
  {sortValue && sortValue !== 'latest' &&(
        <Link 
        className='flex items-center gap-3 bg-green-500 dark:bg-red-500 px-3 py-3 text-slate-100 font-semibold rounded-lg'
        href={route('home',{
          ...params,
          sort:null,
          page:null
        }
      )}><span><b>sort: </b>{sortValue}</span>
        <FontAwesomeIcon icon='close' className='fa-solid fa-close'></FontAwesomeIcon></Link>
      )}
      </>
  )
  
}