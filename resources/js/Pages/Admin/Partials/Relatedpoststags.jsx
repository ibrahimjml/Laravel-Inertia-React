import { Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Relatedpoststags({ closemodel, tag }) {
  const { csrf } = usePage().props
  const { post } = useForm();
  const [loading, setLoading] = useState(null); 
  const [posts, setPosts] = useState(null);  

  const [tagCounts, setTagCounts] = useState({
  posts_count: tag.posts_count,
  approved_count: tag.approved_posts_count,
  unapproved_count: tag.unapproved_posts_count
  });

  const handleClick = (postId) => {
    setLoading(postId);
    post(route('approve.update', postId), {
      _method: 'PUT',
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        setPosts(prev =>
          prev.map(post =>
            post.id === postId ? { ...post, approved: !post.approved } : post
          )
        );
        const changedPost = posts.find(p => p.id === postId);
       if (changedPost) {
       const wasApproved = changedPost.approved;
       setTagCounts(prev => ({
         ...prev,
         approved_count: prev.approved_count + (wasApproved ? -1 : 1),
         unapproved_count: prev.unapproved_count + (wasApproved ? 1 : -1),
       }));
        }
        setLoading(null);
      },
      onError: () => {
        setLoading(null);
      }
    });
  };

  useEffect(() => {
    fetch(route('tags.posts', tag.id), {
      headers: {
        'Accept': 'application/json',
        'X-CSRF-TOKEN': csrf
      }
    })
      .then(res => res.json())
      .then(data => setPosts(data))
       .catch(err => {
        console.error('Error fetching posts:', err);
        setPosts([]); 
      });
  }, [tag.id]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-20 flex items-center justify-center">
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg w-[40%] max-h-[80vh] overflow-y-auto scrollbar-dark">
        <button
          onClick={closemodel}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          <FontAwesomeIcon icon='close' className=" text-black dark:text-white"></FontAwesomeIcon>
        </button>
        <h3 className="text-lg font-bold mb-4 text-center">Related Posts to #{tag.name}</h3>
        <div className="flex  items-center gap-2 mx-auto bg-slate-300 dark:bg-slate-600 rounded-full w-fit px-4 py-2 divide-x divide-gray-500 dark:divide-gray-400 my-2 text-sm font-medium">
         <span className="px-2 flex items-center justify-center gap-1 ">
           <FontAwesomeIcon icon='image' className=" text-white"></FontAwesomeIcon> <b>+{tagCounts.posts_count}</b>
         </span>
         <span className="px-2 flex items-center justify-center gap-1 ">
           <FontAwesomeIcon icon='check' className=" text-green-400"></FontAwesomeIcon> <b>+{tagCounts.approved_count}</b>
         </span>
         <span className="px-2 flex items-center justify-center gap-1 ">
           <FontAwesomeIcon icon='hourglass-start' className="fa-solid fa-hourglass text-yellow-400"></FontAwesomeIcon> <b>+{tagCounts.unapproved_count}</b>
         </span>
         </div>

        { posts === null ? (
           <div className="flex justify-center items-center py-10">
            <FontAwesomeIcon icon='spinner' spin className=" text-gray-500 text-2xl"></FontAwesomeIcon>
          </div>
        ): posts.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-300">No related posts found.</div>
        ) :(
           <ul className="space-y-4 divide-y divide-gray-300  dark:divide-gray-600 last:border-0">
          {posts.map((post) => (
            <li key={post.id} className="flex items-center gap-3 pt-3">
              <img
                src={post.image}
                alt={post.title}
                className={`w-12 h-12 rounded-full border-2 ${
                  post.approved ? 'border-green-500' : 'border-yellow-500'
                } object-cover`}
              />
              <div className="flex-1 flex items-center justify-between">
                <span className="font-medium text-gray-800 dark:text-white">
                  {post.title}
                </span>
                <div className="flex items-center gap-3">
                  <Link
                    href={route('posts.show', post.id)}
                    className="text-sm text-blue-500 dark:text-gray-300"
                  >
                    <FontAwesomeIcon icon='eye'></FontAwesomeIcon>
                  </Link>
                  <button
                    onClick={() => handleClick(post.id)}
                    disabled={loading === post.id}>
                    {loading === post.id ? (
                      <i className="fa-solid fa-spinner fa-spin text-gray-400"></i>
                    ) : post.approved ? (
                      <i className="fa-solid fa-hourglass-start text-yellow-500"></i>
                    ) : (
                      <i className="fa-solid fa-check text-green-500"></i>
                    )}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        )}
        
      </div>
    </div>
  );
}
