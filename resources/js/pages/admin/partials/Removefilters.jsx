import { Link } from '@inertiajs/react'
import { route } from 'ziggy-js'

export default function Removefilters({filter,sortValue,params}) {
  return (
    <>
  {filter.tag && (
  <div >
    <Link
      href={route('tags.page', { 
        ...params,
        tag: null,
         page: null })}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500 text-white font-semibold dark:bg-red-600"
    >
      <small><b>search:</b></small> {filter.tag}
      <i className="fa-solid fa-close"></i>
    </Link>
  </div>
)}

{sortValue && sortValue !== 'latest' && (
  <div >
    <Link
      href={route('tags.page', { ...params,sort: null, page: null })}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500 text-white font-semibold dark:bg-red-600"
    >
      <small><b>sort:</b></small> {sortValue}
      <i className="fa-solid fa-close"></i>
    </Link>
  </div>
)}
    </>
  )
}
