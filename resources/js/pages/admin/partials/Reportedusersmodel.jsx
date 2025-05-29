import React from 'react'

export default function Reportedusersmodel({close,post}) {
  if (!post) return null;
  return (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[40%] max-h-[80vh]  overflow-y-auto relative">
        <button
          onClick={close}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          <i className="fa-solid fa-close text-black dark:text-white"></i>
        </button>
        <h3 className="text-lg font-bold mb-4 text-center">Report on {post.title}</h3>
        {post.reports.length > 0 ? (
       <ul className="space-y-2">
          {post.reports.map((report, index) => (
          <li key={index} className="flex items-center gap-2">
           <i className="fa-solid fa-user text-gray-600 dark:text-white"></i>
           <div className="flex flex-col ml-2">
              <span>{report.user.name}</span>
              <span>@{report.user.username}</span>
           </div>
           <span>{report.reason}</span>
          </li>
          ))}
        </ul>
       ) : (
       <p className="text-center text-sm text-gray-500">No reports</p>
        )}
      </div>
    </div>
  )
}
