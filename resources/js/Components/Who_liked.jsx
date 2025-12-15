import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Wholiked({ likers, closeModal }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[80%] lg:w-[40%] max-h-[80vh]  overflow-y-auto relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          <FontAwesomeIcon icon='close' className=" text-black dark:text-white"></FontAwesomeIcon>
        </button>
        <h3 className="text-lg font-bold mb-4 text-center">People Who Liked</h3>
        {likers.length > 0 ? (
          <ul className="space-y-2">
            {likers.map((user) => (
              <li key={user.id} className="flex items-center gap-2">
                <FontAwesomeIcon icon='user' className=" text-gray-600 dark:text-white"></FontAwesomeIcon>
              <div className="flex flex-col ml-2 ">
                  <span>{user.name}</span>
                  <span>@{user.username}</span>
              </div>
                <span className="text-sm text-gray-600 dark:text-white w-fit ml-auto">+{user.count} Lik{user.count >1 ? 'es':'e'}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">No likes yet.</p>
        )}
      </div>
    </div>
  );
}
