import React from 'react'
import Navbar from './Partials/Navbar'
import { Link, router } from '@inertiajs/react'
import { route } from 'ziggy-js'

export default function Reportspage({reports}) {
  const handeldelete =(reportID)=>{
    if(!confirm('Are you sure deleting this report ?')){
      return;
    }
    router.delete(route('delete.report',reportID))
  }
  return (
    <div>
      <Navbar/>
      <div className='bg-white  mx-auto p-8 rounded-lg shadow-lg dark:bg-slate-800 mb-4'>

       <table className='w-full mx-auto table-fixed border-collapse overflow-hidden rounded-md text-sm ring-1 ring-slate-300 dark:ring-slate-600 bg-white shadow-lg'>
        <thead className='bg-slate-600 text-slate-300 uppercase text-xs text-left'>
        <tr className="bg-slate-600 text-slate-300 uppercase text-xs text-left">
                <th className="w-2/6 p-3">post</th>
                <th className="w-1/6 p-3">reported by</th>
                <th className="w-1/6 p-3 text-center">reason</th>
                <th className="w-1/6 p-3 text-center">other</th>
                <th className="w-1/6 p-3 text-center">created</th>
                <th className="w-1/6 p-3 text-right">action</th>
                
            </tr>
            </thead>
          <tbody >
            {reports.data && reports.data.map(report=>{
            return(
              <tr key={report.id} className='border-b border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-600 dark:border-slate-600'>
               <td className="w-2/6 py-5 px-3">
                  <div className='flex items-center gap-2'>
                  <img
                  src={report.post.image}
                  alt={report.post.title}
                  className='w-9 h-9 rounded-full border-2  object-cover'/>
                  <p>{report.post.title}</p>  
                  </div>
                </td>
                <td className='w-1/6 py-5 px-3 text-left'>
                 {report.user.name}
                </td>
                <td className="w-1/6 py-5 px-3 text-center">
                 {report.reason}
                </td>
                <td className="w-1/6 py-5 px-3 text-center">
                {report.other || '--'}
                </td>
                <td className='text-center'>
                <p>{new Date(report.created_at).toLocaleDateString()}</p>
                </td>
                <td className='w-1/6 py-5 px-3 text-right'>
                <div className='flex gap-4 justify-end'>
                  <Link href={route('posts.show',report.post.id)}><i className='fa-solid fa-eye text-blue-500 dark:text-gray-300'></i></Link>
                  <button onClick={()=>{handeldelete(report.id)}}><i className='fa-solid fa-trash text-red-500'></i></button>
                </div>
                </td>
            </tr>
            )
            
            })}
              
          
          
          </tbody>
       </table>
    </div>
    </div>
  )
}
