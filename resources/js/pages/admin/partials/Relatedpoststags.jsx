import { Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function Relatedpoststags({ closemodel, tag }) {
  const { put } = useForm();
  const [loading, setLoading] = useState(null); 
  const [posts, setPosts] = useState(null);    

  const handleClick = (postId) => {
    setLoading(postId);
    put(route('approve.update', postId), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        setPosts(prev =>
          prev.map(post =>
            post.id === postId ? { ...post, approved: !post.approved } : post
          )
        );
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
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
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
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[40%] max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={closemodel}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          <i className="fa-solid fa-close text-black dark:text-white"></i>
        </button>
        <h3 className="text-lg font-bold mb-4 text-center">Related Posts to #{tag.name}</h3>
        { posts === null ? (
           <div className="flex justify-center items-center py-10">
            <i className="fa-solid fa-spinner fa-spin text-gray-500 text-2xl"></i>
          </div>
        ): posts.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-300">No related posts found.</div>
        ) :(
           <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="flex items-center gap-3">
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
                    <i className="fa-solid fa-eye"></i>
                  </Link>
                  <button
                    onClick={() => handleClick(post.id)}
                    disabled={loading === post.id}
                  >
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
