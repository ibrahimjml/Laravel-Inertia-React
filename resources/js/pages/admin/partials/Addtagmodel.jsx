import { useForm } from '@inertiajs/react'
import React from 'react'

export default function Addtagmodel({closemodel}) {
  const { data, setData, post, processing, errors } = useForm({
      name:  ''
    })
  
    const handleSubmit = (e) => {
      e.preventDefault()
  
      post(route('tag.create'), {
        preserveScroll: true,
        onSuccess: () => closemodel(),
      })
    }
  return (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-20 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[40%] max-h-[80vh]  overflow-y-auto relative">
        <button
          onClick={closemodel}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          <i className="fa-solid fa-close text-black dark:text-white"></i>
        </button>
        <h3 className="text-lg font-bold mb-4 text-center">Add New Tag</h3>
          {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
              Tag Name
            </label>
            <input
              type="text"
              className="w-3/6 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
              placeholder='type a tag'
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div className="flex justify-start gap-3">
            <button
              type="button"
              onClick={closemodel}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 rounded bg-green-500 dark:bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {processing ? (<i className="fa-solid fa-spinner fa-spin text-white"></i>) : 'Create'}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
