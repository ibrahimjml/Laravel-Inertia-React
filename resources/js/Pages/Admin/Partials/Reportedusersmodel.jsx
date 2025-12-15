

export default function Reportedusersmodel({close,post}) {
  if (!post) return null;
  return (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[80%] lg:w-[40%] max-h-[80vh]  overflow-y-auto relative">
        <button
          onClick={close}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          <i className="fa-solid fa-close text-black dark:text-white"></i>
        </button>
        <h3 className="text-lg font-bold mb-4 text-center">Report on {post.title}</h3>
       {post.reports && post.reports.length > 0 ? (
          <table className="w-full text-sm text-left border border-gray-300 dark:border-gray-600">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">User</th>
                <th className="p-3">Username</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Other</th>
              
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {post.reports.map((report, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className='p-3'>{index +1}</td>
                  <td className="p-3">{report.user?.name}</td>
                  <td className="p-3">@{report.user?.username}</td>
                  <td className="p-3">{report.reason_label || '-'}</td>
                  <td className="p-3">{report.reason?.other || '-'}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-sm text-gray-500">No reports</p>
        )}
      </div>
    </div>
  )
}
