import { Link } from "@inertiajs/react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Morearticles({post}) {

  const [isFollowing, setIsFollowing] = useState(post.user.is_followed ?? false);
  return (
    <>
    <div className="bg-white dark:border-2 border-slate-600 p-4  dark:bg-dark rounded-md shadow-lg overflow-hidden h-full flex flex-col justify-between">
    
        <Link href={route("posts.show", post.id)}>
          <img
            className="w-full h-48 object-cover object-center"
            src={post.image}
            alt={post.title}
          />
        </Link>
        <div className="p-4 ">
          <h3 className="font-bold text-xl mb-2">{post.title.slice(0, 60)}...</h3>
          
          <span>
            <FontAwesomeIcon icon='user' className=" text-gray-600 dark:text-white"></FontAwesomeIcon>
            <button
              className="font-semibold ml-2 text-green-500 dark:text-blue-500"
            >
              {post.user.name}
            </button>
            {isFollowing && (
              <span className="ml-2">
              <b>·</b>
            <small className="ml-2">Following</small>
              </span>
            )}
          </span>
          
  </div>
        </div>
    
    </>
  );
}
