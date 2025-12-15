import Navbar from './Partials/Navbar'
import { Link, router } from '@inertiajs/react'
import { route } from 'ziggy-js'
import Paginatelinks from '../../Components/Paginatelinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Reportspage({Commentreports}) {
  const handeldelete =(reportID)=>{
    if(!confirm('Are you sure deleting this report ?')){
      return;
    }
    router.delete(route('delete.comment.report',reportID))
  }
  return (
    <div>
      <Navbar/>
<<<<<<< HEAD
      <div className='bg-white  mx-auto p-8 rounded-lg shadow-lg dark:bg-slate-800 mb-4'>

       <table className='w-full mx-auto table-fixed border-collapse overflow-hidden rounded-md text-sm ring-1 ring-slate-300 dark:ring-slate-600 bg-white shadow-lg'>
=======
      <div className='bg-white mx-auto p-8 rounded-lg shadow-lg dark:bg-slate-800 mb-4 overflow-x-auto scrollbar-dark'>

       <table className='w-full min-w-[800px] mx-auto table-auto border-collapse overflow-hidden rounded-md text-sm ring-1 ring-slate-300 dark:ring-slate-600 bg-white shadow-lg'>
>>>>>>> origin/v1.0.3
        <thead className='bg-slate-600 text-slate-300 uppercase text-xs text-left'>
        <tr className="bg-slate-600 text-slate-300 uppercase text-xs text-left">
                <th className="w-2/6 p-3">post</th>
                <th className="w-2/6 p-3">Content</th>
                <th className="w-1/6 p-3">reported by</th>
                <th className="w-1/6 p-3 text-center">reason</th>
                <th className="w-1/6 p-3 text-center">other</th>
                <th className="w-1/6 p-3 text-center">created</th>
                <th className="w-1/6 p-3 text-right">action</th>
                
            </tr>
            </thead>
          <tbody >
            {Commentreports.data && Commentreports.data.map(report=>{
            return(
              <tr key={report.id} className='border-b border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-600 dark:border-slate-600'>
               <td className="w-2/6 py-5 px-3">
                  <div className='flex items-center gap-2'>
                  <img
                  src={report.comment.post.image}
                  alt={report.comment.post.title}
                  className='w-9 h-9 rounded-full border-2  object-cover'/>
                  <p>{report.comment.post.title}</p>  
                  </div>
                </td>
                <td className='w-2/6 py-5 px-3 text-left'>
                 {report.comment.content}
                </td>
                <td className='w-1/6 py-5 px-3 text-left'>
                 {report.user.name}
                </td>
                <td className="w-1/6 py-5 px-3 text-center">
                 {report.reason_label}
                </td>
                <td className="w-1/6 py-5 px-3 text-center">
                {report.other || '--'}
                </td>
                <td className='text-center'>
                <p>{new Date(report.created_at).toLocaleDateString()}</p>
                </td>
                <td className='w-1/6 py-5 px-3 text-right'>
                <div className='flex gap-4 justify-end'>
                  <Link href={route('posts.show',report.comment.post.id)}><FontAwesomeIcon icon='eye' className=' text-blue-500 dark:text-gray-300'></FontAwesomeIcon></Link>
                  <button onClick={()=>{handeldelete(report.id)}}><FontAwesomeIcon icon='trash' className=' text-red-500'></FontAwesomeIcon></button>
                </div>
                </td>
            </tr>
            )
            
            })}
              
          
          
          </tbody>
       </table>
    </div>
    <div className='flex justify-start items-center mt-4 '>
    <Paginatelinks posts={Commentreports}/>
    </div>
    </div>
    
  )
}
