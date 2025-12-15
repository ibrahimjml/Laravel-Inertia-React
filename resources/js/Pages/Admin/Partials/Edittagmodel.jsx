import { useForm } from '@inertiajs/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Edittagmodel({ closemodel, tag }) {
  const { data, setData, patch, processing, errors } = useForm({
    name: tag.name || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    patch(route('tag.edit', tag.id), {
      preserveScroll: true,
      onSuccess: () => closemodel(),
    })
  }

  if (!tag) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-20 flex items-center justify-center">
<<<<<<< HEAD
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[40%] max-h-[80vh] overflow-y-auto relative">
=======
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[80%] lg:w-[40%] max-h-[80vh] overflow-y-auto relative">
>>>>>>> origin/v1.0.3
        {/* Close button */}
        <button
          onClick={closemodel}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          <FontAwesomeIcon icon='close' className=" text-black dark:text-white"></FontAwesomeIcon>
        </button>

        <h3 className="text-lg font-bold mb-4 text-center">Edit Tag #{tag.name}</h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Tag Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
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
              {processing ? (<FontAwesomeIcon icon='spinner' spin className=" text-white"></FontAwesomeIcon>) : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
